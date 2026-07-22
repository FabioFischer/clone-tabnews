import { Pool } from "pg";

async function query(command) {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
  var response;

  try {
    response = await pool.query(command, null);
  } catch (error) {
    console.error("Database connection error:", error.stack);
  } finally {
    await pool.end();
  }

  return response;
}

export default {
  query: query,
};
