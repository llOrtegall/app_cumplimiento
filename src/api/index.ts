import { pool } from './config';
import { PoolConnection } from 'mariadb';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  identificacion: number;
  estado: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const conn: PoolConnection = await pool.getConnection();
  try {
    const results: User[] = await conn.query('SELECT * FROM persona');
    return results;
  } catch (error) {
    console.log(error);
    throw 'Error al obtener los usuarios';
  } finally {
    conn.release();
  }
}