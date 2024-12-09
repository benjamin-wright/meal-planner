export type Ingredient = {
  id?: number;
  name: string;
  category: number;
  unit: number;
};

export const ingredientSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    category: { keyPath: "category" },
    unit: { keyPath: "unit" },
  },
};