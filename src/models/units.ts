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

export type magnitude = {
  singular: string;
  plural: string;
  abbrev: string;
  multiplier: number;
}

export type collective = {
  singular?: string;
  plural?: string;
  multiplier?: number;
}

export type unit = {
  id: number;
  name: string;
  type: UnitType;
  base?: number;
  magnitudes: magnitude[];
  collectives: collective[];
}

export class Unit {
  static default(): unit {
    return {
      id: 0,
      name: "",
      type: UnitType.Count,
      base: 1,
      magnitudes: [],
      collectives: [],
    };
  }

  static validate(unit: unit): boolean {
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

  static abbr(unit: unit, value: number, collective?: number): string {
    if (unit.type === UnitType.Count) {
      return Unit.string(unit, value, collective);
    } else {
      const magnitude = Unit.magnitude(unit, value);
      if (magnitude) {
        return magnitude.abbrev;
      } else {
        return "";
      }
    }
  }

  static string(unit: unit, value: number, collective?: number): string {
    if (unit.type === UnitType.Count) {
      const unitCollective = Unit.collective(unit, collective);
  
      if (value === 1) {
        return unitCollective.singular ? ` ${unitCollective.singular}` : "";
      } else {
        return unitCollective.plural ? ` ${unitCollective.plural}` : "";
      }
    } else {
      const magnitude = Unit.magnitude(unit, value);
      if (magnitude) {
        return " " + (value === 1 ? magnitude.singular : magnitude.plural);
      } else {
        return "";
      }
    }
  }

  static collective(unit: unit, collective?: number): collective {
    if (collective === undefined) {
      throw new Error("Collective is required for count units");
    }

    if (unit.collectives.length === 0) {
      throw new Error(`No collectives defined for unit '${unit.name}'`);
    }

    if (collective < 0 || collective >= unit.collectives.length) {
      throw new Error(`Invalid collective index, got ${collective}, expected 0-${unit.collectives.length - 1}`);
    }

    return unit.collectives[collective];
  }

  static magnitude(unit: unit, value: number): magnitude | undefined {
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
}