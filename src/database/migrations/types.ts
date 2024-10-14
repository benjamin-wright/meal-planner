import { Database } from "../database";

export type Migration = (db: Database) => void;
