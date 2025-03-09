import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'User name is required'],
			trim: true,
			min: [2, 'User name must be at least 2 characters'],
			max: [50, 'User name must be at most 50 characters'],
		},
		email: {
			type: String,
			required: [true, 'User email is required'],
			trim: true,
			unique: true,
			lowercase: true,
			match: [/\S+@\S+\.\S+/, 'User email is not valid'],
		},
		password: {
			type: String,
			required: true,
			min: [6, 'Password must be at least 6 characters'],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
