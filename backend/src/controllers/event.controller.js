import Event from '../models/event.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { removeMongoDBIdFromArray } from '../utils/mongo-utils.js';

export const createEvent = asyncHandler(async (req, res, next) => {
	// const session = await mongoose.startSession();
	// session.startTransaction();
	const {
		title,
		description,
		date,
		startTime,
		endTime,
		category,
		author,
		location,
	} = req.body;
	if (
		!title ||
		!description ||
		!date ||
		!startTime ||
		!endTime ||
		!category ||
		!author ||
		!location
	) {
		const error = new Error('All fields are required.');
		error.statusCode = 400;
		throw error;
	}
	const newEvent = await Event.create({
		author,
		title,
		description,
		date,
		startTime,
		endTime,
		category,
		location,
	});
	// await session.commitTransaction();
	// session.endSession();
	res.status(201).json({
		success: true,
		message: 'Event created successfully',
		data: newEvent,
	});
});

export const getEvents = asyncHandler(async (req, res, next) => {
	const events = await Event.find().select('-__v').lean();

	const processedEvents = removeMongoDBIdFromArray(events);

	res.status(200).json({
		success: true,
		data: processedEvents,
	});
});

export const joinEvent = asyncHandler(async (req, res, next) => {
	const id = req.params?.id;
	const userId = req.user?.id;
	const event = await Event.findById(id);
	if (!event) {
		const error = new Error('Event not found');
		error.statusCode = 404;
		throw error;
	}
	if (event.attendees.includes(userId)) {
		const error = new Error('You have already joined this event');
		error.statusCode = 400;
		throw error;
	}
	event.attendees.push(userId);
	await event.save();
	return res.status(200).json({
		status: true,
		message: 'Successfully joined the event',
		data: event,
	});
});

export const getMyEvents = asyncHandler(async (req, res, next) => {
	const userId = req.user?.id;
	const events = await Event.find({ author: userId }).select('-__v').lean();
	const processedEvents = removeMongoDBIdFromArray(events);
	res.status(200).json({
		status: true,
		data: processedEvents,
	});
});
