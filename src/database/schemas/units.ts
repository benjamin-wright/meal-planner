export type Unit = {
  id?: number;
  name: string;
  plural: string;
  abbrev: string;
  magnitudes: Magnitude[];
  base?: number;
  conversion?: number;
};

export type Magnitude = {
  name: string;
  plural: string;
  abbrev: string;
  multiplier: number;
};

export const unitSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};
