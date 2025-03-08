import pkg from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
	database: DB_NAME,
});

pool.on('connect', () => {
	console.log('Database connected');
});

export default pool;
