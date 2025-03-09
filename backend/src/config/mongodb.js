import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from './env.js';

if (!DB_URI) {
	throw new Error(
		'Please Define the MONGODB_URI environment variable inside .env.<development/production>.local'
	);
}
const connectMongo = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log(`Connected to MongoDB in ${NODE_ENV} mode.`);
	} catch (err) {
		console.error('Error connecting to MongoDB: ', err);
		process.exit(1);
	}
};

export default connectMongo;
