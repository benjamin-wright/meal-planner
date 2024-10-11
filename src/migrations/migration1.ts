import { Database } from '../database';

export default async function migration1(db: Database): Promise<void> {
    await db.units.add({ name: "g" });
}