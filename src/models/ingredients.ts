export class Ingredient {
  id: number;
  name: string;
  category: number;
  edible: boolean;

  constructor(id: number, name: string, category: number, edible: boolean) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.edible = edible;
  }
};
