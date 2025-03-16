import { Router } from 'express';
import {
	createEvent,
	getEvents,
	joinEvent,
} from '../controllers/event.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const eventRouter = Router();

eventRouter.route('/').post(createEvent).get(getEvents);
eventRouter.route('/:id/join').put(authorize, joinEvent);

export default eventRouter;
