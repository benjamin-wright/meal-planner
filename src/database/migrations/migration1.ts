import { Unit } from "../schemas/units";
import { IDatabaseTransport } from "../types";

export async function migration1(transport: IDatabaseTransport) {
  const units = transport.store<Unit>("units");

  await units.add(
    new Unit("gram", [
      {
        singular: "milligram",
        plural: "milligrams",
        abbrev: "mg",
        multiplier: 0.001,
      },
      { singular: "gram", plural: "grams", abbrev: "g", multiplier: 1 },
      {
        singular: "kilogram",
        plural: "kilograms",
        abbrev: "kg",
        multiplier: 1000,
      },
    ])
  );

  await units.add(
    new Unit("litre", [
      {
        singular: "millilitre",
        plural: "millilitres",
        abbrev: "ml",
        multiplier: 0.001,
      },
      { singular: "litre", plural: "litres", abbrev: "l", multiplier: 1 },
    ])
  );
}
