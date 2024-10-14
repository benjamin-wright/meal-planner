
export type Planner = {
  id?: number;
  name: string;
  date: Date;
};

export const plannerSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    date: { keyPath: "date" },
  },
};
