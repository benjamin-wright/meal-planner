import { migration1 } from "./migration1";
import { migration2 } from "./migration2";
import { Migration } from "./types";

export const migrations: Migration[] = [migration1, migration2];
