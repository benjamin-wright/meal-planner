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

export function isCount(unit: Unit): boolean {
  return unit.magnitudes.length === 0;
}

export function getAbbr(unit: Unit, value: number): string {
  if (isCount(unit)) {
    if (value === 1) {
      return unit.singular ? ` ${unit.singular}` : "";
    } else {
      return unit.plural ? ` ${unit.plural}` : "";
    }
  } else {
    const magnitude = getNearestMagnitude(unit, value);
    if (magnitude) {
      return magnitude.abbrev;
    } else {
      return "";
    }
  }
}

export function getNearestMagnitude(unit: Unit, value: number): Magnitude | undefined {
  if (unit.magnitudes.length === 0) {
    return undefined;
  }

  let selected = unit.magnitudes[0];
  let closest = Number.MAX_VALUE;

  unit.magnitudes.forEach((magnitude) => {
    const diff = Math.abs(value / magnitude.multiplier);
    if (diff >= 1 && diff < closest) {
      closest = diff;
      selected = magnitude;
    }
  });

  return selected;
}