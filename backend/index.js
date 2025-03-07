import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import pool from './src/config/db.js';
import { PORT } from './src/config/env.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
	const result = await pool.query('SELECT current_database()');
	const dbName = result.rows[0].current_database;
	res.send(`Connected to ${dbName}`);
});
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;
