import { UnitType } from "./units";

export class Ingredient {
  id: number;
  name: string;
  category: number;
  unitType: UnitType;
  unit?: number;

  constructor(id: number, name: string, category: number, unitType: UnitType, unit?: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.unitType = unitType;
    this.unit = unit;
  }
};
