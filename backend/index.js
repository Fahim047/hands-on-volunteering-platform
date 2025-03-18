import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectMongo from './src/config/mongodb.js';
import errorMiddleware from './src/middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import { PORT } from './src/config/env.js';
import authRouter from './src/routes/auth.routes.js';
import eventRouter from './src/routes/event.routes.js';
import helpRequestRouter from './src/routes/helpRequest.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/help-requests', helpRequestRouter);

app.use(errorMiddleware);

app.get('/', async (req, res) => {
	res.send('Hello World');
});
const port = PORT || 8000;
connectMongo()
	.then(() => {
		app.on('error', (err) => {
			console.log('Error happened in the server: ', err);
			throw err;
		});
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error('MongoDB connection failed: ', err);
	});

export default app;
