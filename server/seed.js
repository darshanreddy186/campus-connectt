import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Event } from './models/event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const seedEvents = [
  {
    title: "Tech Innovation Summit 2024",
    date: "2024-03-25",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    description: "Join us for a day of cutting-edge technology discussions and hands-on workshops.",
    location: "Main Auditorium",
    registeredUsers: []
  },
  {
    title: "Cultural Festival",
    date: "2024-04-02",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
    description: "Celebrate diversity through music, dance, and art performances.",
    location: "Campus Ground",
    registeredUsers: []
  },
  {
    title: "Career Fair 2024",
    date: "2024-04-15",
    category: "Career",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
    description: "Connect with top employers and explore career opportunities.",
    location: "Business School",
    registeredUsers: []
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert new events
    await Event.insertMany(seedEvents);
    console.log('Seeded events successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();