import bcrypt from 'bcryptjs';
import { createUser } from '../models/user.model.js';
export const signIn = (req, res, next) => {
	res.send('Sign in');
};
export const signUp = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await createUser(name, email, hashedPassword);
		return res.status(201).json({ success: true, data: newUser });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: err.message });
	}
};
export const signOut = (req, res, next) => {
	res.send('Sign out');
};
