import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: [2, 'Event title must be at least 2 characters'],
			maxlength: [100, 'Event title must be at most 100 characters'],
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		startTime: {
			type: String,
			required: true,
			match: [/^([0-9]{2}):([0-9]{2})$/, 'Invalid time format (HH:MM)'],
		},
		endTime: {
			type: String,
			required: true,
			match: [/^([0-9]{2}):([0-9]{2})$/, 'Invalid time format (HH:MM)'],
			validate: {
				validator: function (value) {
					return this.startTime < value;
				},
				message: 'End time must be after start time',
			},
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
		},
		attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
