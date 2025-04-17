export class Ingredient {
  id: number;
  name: string;
  category: number;
  unit: number;
  collective?: number;

  constructor(id: number, name: string, category: number, unit: number, collective?: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.unit = unit;
    this.collective = collective;
  }
};
