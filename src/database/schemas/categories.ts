export class Category {
  id?: number;
  name: string;
  order: number;

  constructor(name: string, order: number) {
    this.name = name;
    this.order = order;
  }
}

export const categorySchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};
