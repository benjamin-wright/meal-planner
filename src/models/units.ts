export enum UnitType {
  Count = "count",
  Weight = "weight",
  Volume = "volume",
}

export function parseUnitType(type: string): UnitType | undefined {
  switch (type) {
    case "count":
      return UnitType.Count;
    case "weight":
      return UnitType.Weight;
    case "volume":
      return UnitType.Volume;
    default:
      return undefined;
  }
}

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

export class Collective {
  singular?: string;
  plural?: string;
  multiplier?: number;

  constructor(multiplier?: number, singular?: string, plural?: string) {
    this.singular = singular;
    this.plural = plural;
    this.multiplier = multiplier;
  }
}

export class Unit {
  id: number;
  name: string;
  type: UnitType;
  base?: number;
  magnitudes: Magnitude[];
  collectives: Collective[];

  constructor(id: number, name: string, type: UnitType, magnitudes: Magnitude[], collectives: Collective[], base?: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.magnitudes = magnitudes;
    this.collectives = collectives;
    this.base = base;
  }
}

export function getAbbr(unit: Unit, value: number, collective?: number): string {
  if (unit.type === UnitType.Count) {
    if (collective === undefined) {
      throw new Error("Collective is required for count units");
    }

    if (unit.collectives.length === 0) {
      throw new Error(`No collectives defined for unit '${unit.name}'`);
    }

    if (collective < 0 || collective >= unit.collectives.length) {
      throw new Error(`Invalid collective index, got ${collective}, expected 0-${unit.collectives.length - 1}`);
    }

    const unitCollective = unit.collectives[collective];

    if (value === 1) {
      return unitCollective.singular ? ` ${unitCollective.singular}` : "";
    } else {
      return unitCollective.plural ? ` ${unitCollective.plural}` : "";
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
