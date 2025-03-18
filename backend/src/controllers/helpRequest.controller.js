import { HelpRequest } from '../models/helpRequest.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
	removeMongoDBIdFromArray,
	removeMongoDBIdFromObject,
} from '../utils/mongo-utils.js';

export const getHelpRequests = asyncHandler(async (req, res, next) => {
	const helpRequests = await HelpRequest.find().lean();
	console.log(helpRequests);
	return res.status(200).json({
		status: true,
		message: 'Successfully fetched the help requests',
		data: removeMongoDBIdFromArray(helpRequests),
	});
});
export const createHelpRequest = asyncHandler(async (req, res, next) => {
	const { title, description, urgency, author } = req.body;
	if (!title || !description || !urgency || !author) {
		const error = new Error('All fields are required.');
		error.statusCode = 400;
		throw error;
	}
	const newHelpRequest = await HelpRequest.create({
		title,
		description,
		urgency,
		author,
	});
	return res.status(201).json({
		status: true,
		message: 'Successfully created the help request',
		data: removeMongoDBIdFromObject(newHelpRequest),
	});
});

export const getHelpRequest = asyncHandler(async (req, res, next) => {
	const id = req.params?.id;
	const helpRequest = await HelpRequest.findById(id)
		.populate('author', 'name')
		.lean();
	if (!helpRequest) {
		const error = new Error('Help request not found');
		error.statusCode = 404;
		throw error;
	}
	return res.status(200).json({
		status: true,
		message: 'Successfully fetched the help request',
		data: removeMongoDBIdFromObject(helpRequest),
	});
});
