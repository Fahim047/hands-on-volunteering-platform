import Event from '../models/event.model.js';
import asyncHandler from '../utils/asyncHandler.js';

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
