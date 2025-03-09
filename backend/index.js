import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { PORT } from './src/config/env.js';
import connectMongo from './src/config/mongodb.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import authRouter from './src/routes/auth.routes.js';

app.use('/api/v1/auth', authRouter);

app.get('/', async (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);
	await connectMongo();
});

export default app;
