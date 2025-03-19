import { Router } from 'express';
import {
	createEvent,
	getEvents,
	getMyEvents,
	joinEvent,
} from '../controllers/event.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const eventRouter = Router();

eventRouter.route('/').post(createEvent).get(getEvents);
eventRouter.route('/my-events').get(authorize, getMyEvents);
eventRouter.route('/:id/join').patch(authorize, joinEvent);

export default eventRouter;
