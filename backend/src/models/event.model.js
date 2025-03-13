import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		// title, description, date, time, location, and category
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			req: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			min: [2, 'Event title must be at least 2 characters'],
			max: [100, 'Event title must be at most 100 characters'],
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
