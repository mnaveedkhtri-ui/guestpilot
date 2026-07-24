import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL ?? "file:./guestpilot.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  const db = drizzle(client);

  console.log("Running migrations…");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Done.");
  client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
