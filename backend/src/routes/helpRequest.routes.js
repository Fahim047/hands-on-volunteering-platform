import { Router } from 'express';
import {
	createComment,
	getCommentsByHelpRequestId,
} from '../controllers/comment.controller.js';
import {
	createHelpRequest,
	getHelpRequest,
	getHelpRequests,
} from '../controllers/helpRequest.controller.js';

const helpRequestRouter = Router();

helpRequestRouter.route('/').get(getHelpRequests).post(createHelpRequest);
helpRequestRouter.route('/:id').get(getHelpRequest);
helpRequestRouter
	.route('/:id/comments')
	.get(getCommentsByHelpRequestId)
	.post(createComment);

export default helpRequestRouter;
