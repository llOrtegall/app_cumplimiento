import { pool } from './config';
import { PoolConnection } from 'mariadb';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const conn: PoolConnection = await pool.getConnection();
    const results: User[] = await conn.query('SELECT * FROM persona');
    conn.release();
    return results;
  } catch (error) {
    console.log(error);
    throw 'Error al obtener los usuarios';
  }
}