import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from '../config';
import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  timezone: '-05:00',
});