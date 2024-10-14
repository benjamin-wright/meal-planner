export type Category = {
  id?: number;
  name: string;
};

export const categorySchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};
