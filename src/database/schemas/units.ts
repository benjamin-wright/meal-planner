export class Unit {
  id?: number;
  name: string;
  magnitudes: Magnitude[];
  base?: number;
  conversion?: number;

  constructor(
    name: string,
    magnitudes: Magnitude[],
    base?: number,
    conversion?: number,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.magnitudes = magnitudes;
    this.base = base;
    this.conversion = conversion;
  }
}

export type Magnitude = {
  singular: string;
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
