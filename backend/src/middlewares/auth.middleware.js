import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';
import { removeMongoDBIdFromObject } from '../utils/mongo-utils.js';

export const authorize = async (req, res, next) => {
	try {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}
		if (!token) return res.status(401).json({ message: 'Unauthorized' });

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.userId).select('-password').lean();
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		req.user = removeMongoDBIdFromObject(user);
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized', error: error.message });
	}
};
