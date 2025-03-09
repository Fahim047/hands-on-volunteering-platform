import pool from '../config/db.js';

// Create Users Table
export const createUserTable = async () => {
	const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
	await pool.query(query);
	console.log('✅ Users table created');
};
// Insert New User
export const createUser = async (name, email, hashedPassword) => {
	try {
		const query =
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
		const values = [name, email, hashedPassword];
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error('Error creating user:', error);
		throw error; // re-throw the error
	}
};
