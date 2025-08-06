import mongoose from 'mongoose';

export const initMongoConnection = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log(' Connected to MongoDB');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1);
  }
};
