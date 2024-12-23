export class Ingredient {
  id: number;
  name: string;
  category: number;
  unit: number;

  constructor(id: number, name: string, category: number, unit: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.unit = unit;
  }
};