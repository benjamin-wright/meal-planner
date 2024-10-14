
export type Recipie = {
  id?: number;
  name: string;
};

export const recipieSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    category: { keyPath: "category" },
  },
};
