import { Database } from "../database";

export default async function migration1(db: Database): Promise<void> {
  await db.units.add({ name: "g" });
  await db.units.add({ name: "kg" });
  await db.units.add({ name: "ml" });
  await db.units.add({ name: "l" });
  await db.units.add({ name: "pcs" });
  await db.units.add({ name: "tsp" });
  await db.units.add({ name: "tbsp" });
  await db.units.add({ name: "cup" });
  await db.units.add({ name: "oz" });
  await db.units.add({ name: "lb" });
  await db.units.add({ name: "pt" });
  await db.units.add({ name: "qt" });
  await db.units.add({ name: "gal" });
  await db.units.add({ name: "fl oz" });
}
