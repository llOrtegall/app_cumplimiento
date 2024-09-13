import { createPool } from 'mariadb'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  connectionLimit: 5
})