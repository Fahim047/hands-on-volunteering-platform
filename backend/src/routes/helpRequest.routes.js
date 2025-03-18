import { Router } from 'express';
import {
	createHelpRequest,
	getHelpRequest,
	getHelpRequests,
} from '../controllers/helpRequest.controller.js';

const helpRequestRouter = Router();

helpRequestRouter.route('/').get(getHelpRequests).post(createHelpRequest);
helpRequestRouter.route('/:id').get(getHelpRequest);

export default helpRequestRouter;
