import mongoose from 'mongoose';

export const dbConnect = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
