import { Router } from 'express';
import { createReply } from '../controllers/comment.controller.js';

const commentRouter = Router();

commentRouter.route('/:id/reply').post(createReply);

export default commentRouter;
