export class Extra {
  id: number;
  ingredient: number;
  unit: number;
  quantity: number;

  constructor(id: number, ingredient: number, unit: number, quantity: number) {
    this.id = id;
    this.ingredient = ingredient;
    this.unit = unit;
    this.quantity = quantity;
  }
}