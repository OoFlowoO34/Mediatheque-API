import mongoose from 'mongoose';
import { DEVELOPMENT } from './server';

const connectDB = async () => {
    try {
        await mongoose.connect(DEVELOPMENT? 'mongodb://localhost:27777/td-mediatheque' : "mongodb://mongo:27017/td-mediatheque" );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;