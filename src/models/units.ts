export class Magnitude {
  singular: string;
  plural: string;
  abbrev: string;
  multiplier: number;

  constructor(singular: string, plural: string, abbrev: string, multiplier: number) {
    this.singular = singular;
    this.plural = plural;
    this.abbrev = abbrev;
    this.multiplier = multiplier;
  }
}

export class Unit {
  id: number;
  name: string;
  singular?: string;
  plural?: string;
  magnitudes: Magnitude[];

  constructor(id: number, name: string, magnitudes: Magnitude[], singular?: string, plural?: string) {
    this.id = id;
    this.name = name;
    this.magnitudes = magnitudes;
    this.singular = singular;
    this.plural = plural;
  }
}
