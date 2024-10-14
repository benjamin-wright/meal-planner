import { Unit } from "../schemas/units";
import { Database } from "../database";

export async function migration1(db: Database) {
  await db.units.add(
    new Unit("gram", [
      { singular: "gram", plural: "grams", abbrev: "g", multiplier: 1 },
      {
        singular: "kilogram",
        plural: "kilograms",
        abbrev: "kg",
        multiplier: 1000,
      },
      {
        singular: "milligram",
        plural: "milligrams",
        abbrev: "mg",
        multiplier: 0.001,
      },
    ])
  );

  await db.units.add(
    new Unit("litre", [
      { singular: "litre", plural: "litres", abbrev: "l", multiplier: 1 },
      {
        singular: "millilitre",
        plural: "millilitres",
        abbrev: "ml",
        multiplier: 0.001,
      },
    ])
  );
}
