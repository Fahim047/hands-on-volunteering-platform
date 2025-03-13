import { Router } from 'express';
import { createEvent } from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.route('/').post(createEvent);

export default eventRouter;
