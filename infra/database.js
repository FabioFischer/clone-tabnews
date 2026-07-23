import { Pool } from "pg";

async function query(command) {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: getSSLValues(),
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

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development" ? false : true;
}
