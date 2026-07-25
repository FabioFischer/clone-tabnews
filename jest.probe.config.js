const nextJest = require("next/jest");
const r = require("dotenv").config({ path: ".env.development" });
console.log("[config] dotenv error:", r.error ? r.error.code : "none");
console.log("[config] DATABASE_URL type:", typeof process.env.DATABASE_URL);
const createJestConfig = nextJest();
const inner = createJestConfig({ moduleDirectories: ["node_modules", "<rootDir>"] });
module.exports = async () => {
  const cfg = await inner();
  console.log("[config] after next/jest, DATABASE_URL type:", typeof process.env.DATABASE_URL);
  console.log("[config] testEnvironment:", cfg.testEnvironment);
  return cfg;
};
