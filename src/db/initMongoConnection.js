import mongoose from 'mongoose';
import Contact from '../models/contact.js';
import contactsSeed from '../../contacts.json' assert { type: 'json' };

export const initMongoConnection = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Перевіряємо, чи є контакти в БД
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
