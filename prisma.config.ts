import path from "node:path";
import { defineConfig } from "prisma/config";

import "dotenv/config";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
});
