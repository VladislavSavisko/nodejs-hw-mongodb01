import mongoose from 'mongoose';
import Contact from '../models/contact.js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Завантажуємо змінні з .env
dotenv.config();

// Отримуємо шлях до поточного файлу та папки
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Зчитуємо файл із початковими контактами
const contactsSeed = JSON.parse(
  readFileSync(path.join(__dirname, '../../contacts.json'), 'utf-8')
);

export const initMongoConnection = async () => {
  try {
    // Використовуємо повний URI з .env
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    // Підключення до MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Перевіряємо, чи є дані в колекції
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
