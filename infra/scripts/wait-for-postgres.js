const { exec } = require("node:child_process");
const { setTimeout } = require("node:timers/promises");

async function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  async function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\nPostgres online and ready to work!");
  }
}

checkPostgres();
