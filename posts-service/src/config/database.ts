import mongoose from 'mongoose';

export default async (): Promise<void> => {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};