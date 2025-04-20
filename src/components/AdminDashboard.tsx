import React, { useState } from 'react';
import { PlusCircle, Calendar, MapPin, Tag, Image, FileText } from 'lucide-react';

interface EventFormData {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  location: string;
}

interface AdminDashboardProps {
  onEventAdded: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEventAdded }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    category: '',
    image: '',
    description: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          date: '',
          category: '',
          image: '',
          description: '',
          location: ''
        });
        onEventAdded();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">Create and manage campus events seamlessly</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Create New Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: 'Event Title',
                name: 'title',
                type: 'text',
                icon: <FileText className="w-5 h-5 text-gray-500" />,
                placeholder: 'Enter event title',
              },
              {
                label: 'Date',
                name: 'date',
                type: 'date',
                icon: <Calendar className="w-5 h-5 text-gray-500" />,
              },
              {
                label: 'Category',
                name: 'category',
                type: 'select',
                icon: <Tag className="w-5 h-5 text-gray-500" />,
                options: ['', 'Workshop', 'Cultural', 'Career', 'Academic', 'Sports'],
              },
              {
                label: 'Location',
                name: 'location',
                type: 'text',
                icon: <MapPin className="w-5 h-5 text-gray-500" />,
                placeholder: 'Enter event location',
              },
              {
                label: 'Image URL',
                name: 'image',
                type: 'url',
                icon: <Image className="w-5 h-5 text-gray-500" />,
                placeholder: 'Enter image URL',
              },
            ].map((field, idx) => (
              <div key={idx} className="flex items-center bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3">
                <div className="mr-3">{field.icon}</div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {field.options?.slice(1).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-start bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3">
              <FileText className="w-5 h-5 text-gray-500 mt-2 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter event description"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <PlusCircle className="w-5 h-5" />
              Create Event
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
