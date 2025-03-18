import mongoose from 'mongoose';

const HelpRequestSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		urgency: {
			type: String,
			enum: ['low', 'medium', 'urgent'],
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

export const HelpRequest = mongoose.model('HelpRequest', HelpRequestSchema);
