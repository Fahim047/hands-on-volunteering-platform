import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { PORT } from './src/config/env.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;
