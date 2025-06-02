import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function testConnection() {
  const client = await pgPool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Connected to DB at:', res.rows[0].now);
  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    client.release();
  }
}
