import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  location: string;
  registeredUsers?: string[];
}

interface EventCardProps {
  event: Event;
  onRegister: () => void;
  isRegistered: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, isRegistered }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative h-48 group">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-purple-700 shadow-md">
          {event.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <button
          onClick={onRegister}
          disabled={isRegistered}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition duration-200 shadow-md ${
            isRegistered
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
          }`}
        >
          {isRegistered ? '✔ Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
