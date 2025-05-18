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

export type Collective = {
  singular?: string;
  plural?: string;
  multiplier?: number;
}

export type Unit = {
  id: number;
  name: string;
  type: UnitType;
  base?: number;
  magnitudes: Magnitude[];
  collectives: Collective[];
}

export namespace Unit {
  export function empty(): Unit {
    return {id: 0, name: "", type: UnitType.Count, magnitudes: [], collectives: [], base: 1};
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
      collectives: defaultArray<Collective>(data["collectives"], (item) => {
        if (!isObject(item)) {
          throw new Error("Invalid collective data");
        }
        return {
          singular: defaultString(item["singular"], ""),
          plural: defaultString(item["plural"], ""),
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
  
    if (unit.type === UnitType.Count) {
      if (unit.collectives.length === 0) {
        return false;
      }
  
      if (unit.collectives.length === 1) {
        if (unit.collectives[0].singular && !unit.collectives[0].plural) {
          return false;
        }
        if (!unit.collectives[0].singular && unit.collectives[0].plural) {
          return false;
        }
  
        return true;
      }
  
      for (const collective of unit.collectives) {
        if (!collective.singular || !collective.plural) {
          return false;
        }
  
        if (!collective.multiplier || collective.multiplier <= 0) {
          return false;
        }
      }
    } else {
      if (!unit.base || unit.base <= 0) {
        return false;
      }
  
      if (unit.magnitudes.length === 0) {
        return false;
      }
  
      for (const magnitude of unit.magnitudes) {
        if (!magnitude.singular || !magnitude.plural) {
          return false;
        }
  
        if (!magnitude.multiplier || magnitude.multiplier <= 0) {
          return false;
        }
  
        if (!magnitude.abbrev) {
          return false;
        }
      }
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

  export function toCollective(unit: Unit, value: number, collective: Collective): number {
    if (unit.type !== UnitType.Count) {
      throw new Error(`Cannot convert to collective for unit type ${unit.type}`);
    }

    return fixJSRounding(value / (collective.multiplier ?? 1));
  }

  export function fromCollective(unit: Unit, value: number, collective: Collective): number {
    if (unit.type !== UnitType.Count) {
      throw new Error(`Cannot convert from collective for unit type ${unit.type}`);
    }
    return fixJSRounding(value * (collective.multiplier ?? 1));
  }

  export function format(unit: Unit, value: number, options?: {abbr?: boolean}): string {
    switch(unit.type) {
      case UnitType.Count:
        return formatCollective(unit, value);
      case UnitType.Weight:
      case UnitType.Volume:
        return formatMagnitude(unit, value, options?.abbr);
      default:
        throw new Error(`Unknown unit type: ${unit.type}`);
    }
  }

  function formatCollective(unit: Unit, value: number): string {
    const collective = pickCollective(unit, value);
    const adjustedValue = value / (collective.multiplier ?? 1);
    let suffix = "";
    if (adjustedValue === 1 && collective.singular) {
      suffix = ` ${collective.singular}`;
    } else if (collective.plural) {
      suffix = ` ${collective.plural}`;
    }

    return `${round(adjustedValue, 3)}${suffix}`;
  }

  function formatMagnitude(unit: Unit, value: number, abbr?: boolean): string {
    const magnitude = pickMagnitude(unit, value);
    const adjustedValue = value / (magnitude.multiplier * (unit.base ?? 1));

    if (abbr) {
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
  
  export function pickCollective(unit: Unit, value: number): Collective {
    if (unit.collectives.length === 0) {
      throw new Error(`No collectives defined for unit '${unit.name}'`);
    }

    if (unit.collectives.length === 1) {
      return unit.collectives[0];
    }

    let selected = unit.collectives[0];
    let closest = Number.MAX_VALUE;
  
    unit.collectives.forEach((collective) => {
      const diff = Math.abs(value / (collective.multiplier ?? 1));
      if (diff >= 1 && diff < closest) {
        closest = diff;
        selected = collective;
      }
    });
  
    return selected;
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
}
