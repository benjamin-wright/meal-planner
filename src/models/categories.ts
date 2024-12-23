export class Category {
  id: number;
  name: string;
  order: number;

  constructor(id: number, name: string, order: number) {
    this.id = id;
    this.name = name;
    this.order = order;
  }
}