import { pool } from './config'

export const getAllUsers = async () => {
  try {
    const conn = await pool.getConnection()

    const results = conn.execute('SELECT * FROM persona')

    return results
  } catch (error) {
    console.log(error);
    throw 'Error al obtener los usuarios'
  }
}