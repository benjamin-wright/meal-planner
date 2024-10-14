import { Database } from "../database";
import migration1 from "./migration1";

export async function migrate(db: Database) {
  await db.migrate([migration1]);
}
