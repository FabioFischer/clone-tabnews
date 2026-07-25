import { Pool, Client } from "pg";

async function query(command) {
  let pool;
  var response;

  try {
    pool = await getNewPool();
    response = await pool.query(command, null);
  } catch (error) {
    console.error("Database connection error:", error.stack);
  } finally {
    await pool.end();
  }

  return response;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });
  client.connect();
  return client;
}

async function getNewPool() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: getSSLValues(),
  });
  return pool;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
