import { Comment } from '../models/comment.model.js';
import { HelpRequest } from '../models/helpRequest.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { removeMongoDBIdFromArray } from '../utils/mongo-utils.js';

export const getCommentsByHelpRequestId = asyncHandler(
	async (req, res, next) => {
		const id = req.params?.id;
		const helpRequest = await HelpRequest.findById(id);
		if (!helpRequest) {
			const error = new Error('Help request not found');
			error.statusCode = 404;
			throw error;
		}
		const comments = await Comment.find({ helpRequest: id })
			.populate({
				path: 'author',
				select: 'name',
			})
			.populate({
				path: 'replies',
				populate: {
					path: 'author',
					select: 'name avatar', // Populate replies' author too
				},
			})
			.lean();
		return res.status(200).json({
			status: true,
			message: 'Successfully fetched the comments',
			data: removeMongoDBIdFromArray(comments),
		});
	}
);
export const createComment = asyncHandler(async (req, res, next) => {
	const { text, author, parentCommentId } = req.body;
	const helpRequestId = req.params.id;

	// Validate input
	if (!text || !author) {
		const error = new Error('Text and author are required.');
		error.statusCode = 400;
		throw error;
	}

	// Check if the help request exists
	const existingHelpRequest = await HelpRequest.findById(helpRequestId);
	if (!existingHelpRequest) {
		const error = new Error('Help request not found.');
		error.statusCode = 404;
		throw error;
	}

	// Create the new comment
	const newComment = await Comment.create({
		text,
		author,
		helpRequest: helpRequestId,
	});

	// If this is a reply to another comment
	if (parentCommentId) {
		const parentComment = await Comment.findById(parentCommentId);
		if (!parentComment) {
			const error = new Error('Parent comment not found.');
			error.statusCode = 404;
			throw error;
		}

		// Add the new comment to the replies array of the parent comment
		parentComment.replies.push(newComment._id);
		await parentComment.save();
	} else {
		// Add the new top-level comment to the HelpRequest's comments array
		existingHelpRequest.comments.push(newComment._id);
		await existingHelpRequest.save();
	}

	// Respond with success
	return res.status(201).json({
		status: true,
		message: 'Successfully created the comment',
	});
});
export const createReply = asyncHandler(async (req, res, next) => {
	const { text, author } = req.body;
	const parentCommentId = req.params?.id;

	// Validate input
	if (!text || !author) {
		const error = new Error('Text and author are required.');
		error.statusCode = 400;
		throw error;
	}

	// Check if parent comment exists
	const parentComment = await Comment.findById(parentCommentId);
	if (!parentComment) {
		const error = new Error('Parent comment not found.');
		error.statusCode = 404;
		throw error;
	}

	// Create new reply
	const newReply = await Comment.create({
		text,
		author,
		helpRequest: parentComment.helpRequest,
	});

	parentComment.replies.push(newReply._id);
	await parentComment.save();

	return res.status(201).json({
		status: true,
		message: 'Reply successfully created',
		data: newReply,
	});
});
