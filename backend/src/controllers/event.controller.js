import Event from '../models/event.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
	removeMongoDBIdFromArray,
	removeMongoDBIdFromObject,
} from '../utils/mongo-utils.js';

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
		thumbnail,
	} = req.body;
	if (
		!title ||
		!description ||
		!thumbnail ||
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
		thumbnail,
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
export const updateEvent = asyncHandler(async (req, res, next) => {
	const id = req.params?.id;
	const {
		title,
		description,
		date,
		startTime,
		endTime,
		category,
		location,
		thumbnail,
	} = req.body;

	// Check if event exists
	const event = await Event.findById(id);
	if (!event) {
		const error = new Error('Event not found');
		error.statusCode = 404;
		throw error;
	}

	// Update fields only if they are provided in request
	if (title) event.title = title;
	if (description) event.description = description;
	if (thumbnail) event.thumbnail = thumbnail;
	if (date) event.date = date;
	if (startTime) event.startTime = startTime;
	if (endTime) event.endTime = endTime;
	if (category) event.category = category;
	if (location) event.location = location;

	// Save updated event
	await event.save();

	return res.status(200).json({
		status: true,
		message: 'Successfully updated the event',
		data: removeMongoDBIdFromObject(event),
	});
});
export const deleteEvent = asyncHandler(async (req, res, next) => {
	const id = req.params?.id;
	const event = await Event.findByIdAndDelete(id);
	if (!event) {
		const error = new Error('Event not found');
		error.statusCode = 404;
		throw error;
	}
	return res.status(200).json({
		status: true,
		message: 'Successfully deleted the event',
	});
});

export const getEvents = asyncHandler(async (req, res, next) => {
	const { attendee } = req.query; // Get attendee ID from query params

	const filter = attendee ? { attendees: attendee } : {}; // Filter by attendee if provided

	const events = await Event.find(filter)
		.select('-__v')
		.populate('author', 'name')
		.lean();

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
export const getUpcomingEvents = asyncHandler(async (req, res, next) => {
	const today = new Date(); // Get current date

	const events = await Event.find({ date: { $gte: today } })
		.sort({ date: 1 })
		.populate('author', 'name')
		.lean();

	return res.status(200).json({
		status: true,
		message: 'Upcoming events fetched successfully',
		data: removeMongoDBIdFromArray(events),
	});
});
