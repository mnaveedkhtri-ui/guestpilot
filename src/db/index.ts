import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Uses a local file:// libsql database in dev. Swap DATABASE_URL to a
// hosted Turso/libsql (or Postgres, with the drizzle-orm/postgres-js
// adapter) URL for production — no other application code needs to change
// because all queries go through this single `db` export.
const client = createClient({
  url: process.env.DATABASE_URL ?? "file:./guestpilot.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
