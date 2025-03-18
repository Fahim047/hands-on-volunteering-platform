const CommentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: { type: String, required: true },
		replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{ timestamps: true }
);

export const Comment = mongoose.model('Comment', CommentSchema);
