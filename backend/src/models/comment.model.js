import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		helpRequest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'HelpRequest',
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: { type: String, required: true },
		parentComment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			default: null,
			index: true, // ✅ Indexing improves performance
		},
		replies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

export const Comment = mongoose.model('Comment', CommentSchema);
