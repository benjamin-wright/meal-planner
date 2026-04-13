import { fixJSRounding, round } from "../utils/number";
import { defaultArray, defaultNumber, defaultString, defaultType, isObject } from "../utils/typing";

export enum UnitType {
  Count = "count",
  Weight = "weight",
  Volume = "volume",
}

export type Magnitude = {
  singular: string;
  plural: string;
  abbrev: string;
  multiplier: number;
}

export type Unit = {
  id: number;
  name: string;
  type: UnitType;
  base: number;
  magnitudes: Magnitude[];
}

export function empty(): Unit {
  return { id: 0, name: "", type: UnitType.Count, magnitudes: [], base: 1 };
}

export function parseType(type: string): UnitType | undefined {
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

export function sanitize(data: unknown): Unit {
  if (!isObject(data)) {
    throw new Error("Invalid unit data");
  }

  const sanitizedData: Unit = {
    id: defaultNumber(data["id"], 0),
    name: defaultString(data["name"], ""),
    type: defaultType<UnitType>(data["type"], UnitType.Count),
    base: defaultNumber(data["base"], 1),
    magnitudes: defaultArray<Magnitude>(data["magnitudes"], (item) => {
      if (!isObject(item)) {
        throw new Error("Invalid magnitude data");
      }
      return {
        singular: defaultString(item["singular"], ""),
        plural: defaultString(item["plural"], ""),
        abbrev: defaultString(item["abbrev"], ""),
        multiplier: defaultNumber(item["multiplier"], 1),
      };
    }),
  };

  return sanitizedData;
}

export function validate(unit: Unit): boolean {
  if (!unit.name) {
    return false;
  }

  if (!unit.base || unit.base <= 0) {
    return false;
  }

  if (unit.magnitudes.length === 0) {
    return false;
  }

  for (const magnitude of unit.magnitudes) {
    if (unit.type === UnitType.Count ? Boolean(magnitude.singular) !== Boolean(magnitude.plural) : !magnitude.singular || !magnitude.plural) {
      return false;
    }

    if (!magnitude.multiplier || magnitude.multiplier <= 0) {
      return false;
    }

    if (unit.type !== UnitType.Count && !magnitude.abbrev) {
      return false;
    }
  }

  if (unit.magnitudes.map(m => m.multiplier).sort((a, b) => a - b).some((val, idx, arr) => idx > 0 && val === arr[idx - 1])) {
    return false;
  }

  return true;
}

export function toMagnitude(unit: Unit, value: number, magnitude: Magnitude): number {
  if (unit.type === UnitType.Count) {
    throw new Error(`Cannot convert to magnitude for unit type ${unit.type}`);
  }

  return fixJSRounding(value / ((unit.base ?? 1) * magnitude.multiplier));
}

export function fromMagnitude(unit: Unit, value: number, magnitude: Magnitude): number {
  if (unit.type === UnitType.Count) {
    throw new Error(`Cannot convert from magnitude for unit type ${unit.type}`);
  }
  return fixJSRounding(value * ((unit.base ?? 1) * magnitude.multiplier));
}

export function format(unit: Unit, value: number, options?: { abbr?: boolean }): string {
  const magnitude = pickMagnitude(unit, value);
  const adjustedValue = value / (magnitude.multiplier * (unit.base ?? 1));

  if (options?.abbr) {
    return `${round(adjustedValue, 3)}${magnitude.abbrev}`;
  }

  let unitSuffix = "";
  if (adjustedValue === 1 && magnitude.singular) {
    unitSuffix = ` ${magnitude.singular}`;
  } else if (magnitude.plural) {
    unitSuffix = ` ${magnitude.plural}`;
  }
  return `${round(adjustedValue, 3)}${unitSuffix}`;
}

export function pickMagnitude(unit: Unit, value: number): Magnitude {
  if (unit.magnitudes.length === 0) {
    throw new Error(`No magnitudes defined for unit '${unit.name}'`);
  }

  let selected = unit.magnitudes[0];
  let closest = Number.MAX_VALUE;

  unit.magnitudes.forEach((magnitude) => {
    const diff = Math.abs(value / (magnitude.multiplier * (unit.base ?? 1)));
    if (diff >= 0.99 && diff < closest) {
      closest = diff;
      selected = magnitude;
    }
  });

  return selected;
}
