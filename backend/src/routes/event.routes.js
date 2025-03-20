import { Router } from 'express';
import {
	createEvent,
	deleteEvent,
	getEvents,
	getMyEvents,
	getUpcomingEvents,
	joinEvent,
	updateEvent,
} from '../controllers/event.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const eventRouter = Router();

eventRouter.route('/').post(authorize, createEvent).get(getEvents);
eventRouter.route('/upcoming').get(getUpcomingEvents);
eventRouter.route('/my-events').get(authorize, getMyEvents);
eventRouter
	.route('/:id')
	.patch(authorize, updateEvent)
	.delete(authorize, deleteEvent);
eventRouter.route('/:id/join').patch(authorize, joinEvent);

export default eventRouter;
