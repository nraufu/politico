import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let database = process.env.NODE_ENV == 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

export const pool = new Pool({connectionString: database});
export const query = (text, params) => pool.query(text, params);

pool.on('connect', () => console.log('Database Connected....'));
