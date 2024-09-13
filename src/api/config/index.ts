import { createPool } from 'mariadb'

export const pool = createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  port: parseInt(process.env.DB_PORT!),
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  connectionLimit: 5
})