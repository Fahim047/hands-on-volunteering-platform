import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.route('/').post(createEvent).get(getEvents);

export default eventRouter;
