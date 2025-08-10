import mongoose from 'mongoose';
import Contact from '../models/contact.js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Отримуємо шлях до файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаємо JSON з файлу
const contactsSeed = JSON.parse(
  readFileSync(path.join(__dirname, '../../contacts.json'), 'utf-8')
);

export const initMongoConnection = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const count = await Contact.countDocuments();
    if (count === 0) {
      await Contact.insertMany(contactsSeed);
      console.log(`✅ Seeded ${contactsSeed.length} contacts to database`);
    } else {
      console.log(`ℹ Contacts already exist in DB (${count} records)`);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
