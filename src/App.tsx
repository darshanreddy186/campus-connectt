import React, { useEffect, useState } from 'react';
import { Calendar, Users, MessageSquare } from 'lucide-react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import EventCard from './components/EventCard';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const userMetadata = user.publicMetadata;
      setIsAdmin(userMetadata?.role === 'admin');
      fetchAllData();
    }
  }, [isLoaded, user]);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);

      if (user) {
        const userRegistered = data.filter(event =>
          event.registeredUsers?.includes(user.id)
        );
        setRegisteredEvents(userRegistered);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  if (!isLoaded) return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <SignedIn>
        {isAdmin ? (
          <AdminDashboard onEventAdded={fetchAllData} />
        ) : (
          <main className="container mx-auto px-4 py-8">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Campus Connector</h1>
              <p className="text-lg text-gray-600">
                Discover and connect with exciting events happening around your campus.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <FeatureCard icon={<Calendar className="w-8 h-8 text-blue-600 mb-4" />} title="Browse Events" description="Explore upcoming events and register for those that interest you." />
              <FeatureCard icon={<Users className="w-8 h-8 text-green-600 mb-4" />} title="Connect with Peers" description="Network with fellow students and event organizers." />
              <FeatureCard icon={<MessageSquare className="w-8 h-8 text-purple-600 mb-4" />} title="Share Feedback" description="Help improve future events with your valuable feedback." />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Registered Events</h2>
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registeredEvents.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onRegister={() => {}}
                      isRegistered={true}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You haven’t registered for any events yet.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              {isLoading ? (
                <p className="text-gray-500">Loading events...</p>
              ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onRegister={() => handleRegister(event._id)}
                      isRegistered={event.registeredUsers?.includes(user?.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events found. Check back soon!</p>
              )}
            </section>
          </main>
        )}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <Footer />
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 mt-16">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Campus Connector</h3>
        <p className="text-gray-400">Connecting students through meaningful events and experiences.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-gray-400">
          <li>About Us</li>
          <li>Events</li>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
        <p className="text-gray-400">Follow us on social media for updates and announcements.</p>
      </div>
    </div>
  </footer>
);

export default App;
