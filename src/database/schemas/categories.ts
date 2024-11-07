export class Category {
  id?: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export const categorySchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};
