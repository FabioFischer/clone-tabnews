import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  // Execute all pending migrations
  const responseMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(responseMigrations.status).toBe(201);

  const responseMigrationsBody = await responseMigrations.json();
  expect(Array.isArray(responseMigrationsBody)).toBe(true);
  expect(responseMigrationsBody.length).toBeGreaterThan(0);

  // Get list of pending migrations after execution and make sure there isn't any pending migrations to run
  const responseAfterMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
  );
  const responseAfterMigrationsBody = await responseAfterMigrations.json();
  expect(Array.isArray(responseAfterMigrationsBody)).toBe(true);
  expect(responseAfterMigrationsBody.length).toBe(0);

  // Get status of database and make sure its running and without open connections
  const responseDatabaseStatus = await fetch(
    "http://localhost:3000/api/v1/status",
  );
  expect(responseDatabaseStatus.status).toBe(200);

  const responseDatabaseStatusBody = await responseDatabaseStatus.json();
  expect(
    responseDatabaseStatusBody.dependencies.database.opened_connections,
  ).toBe(1);
});
