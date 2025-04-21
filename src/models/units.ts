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

export interface UnitProps {
  id: number;
  name: string;
  type: UnitType;
  base?: number;
  magnitudes: Magnitude[];
  collectives: Collective[];
}

export class Unit {
  id: number;
  name: string;
  type: UnitType;
  base?: number;
  magnitudes: Magnitude[];
  collectives: Collective[];

  private constructor(
    id: number,
    name: string,
    type: UnitType,
    base?: number,
    magnitudes: Magnitude[] = [],
    collectives: Collective[] = []
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.base = base;
    this.magnitudes = magnitudes;
    this.collectives = collectives;
  }

  static from({
    id,
    name,
    type,
    base,
    magnitudes = [],
    collectives = [],
  }: UnitProps): Unit {
    return new Unit(id, name, type, base, magnitudes, collectives);
  }

  static empty(): Unit {
    return new Unit(0, "", UnitType.Count);
  }

  static parseType(type: string): UnitType | undefined {
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

  validate(): boolean {
    if (!this.name) {
      return false;
    }
  
    if (this.type === UnitType.Count) {
      if (this.collectives.length === 0) {
        return false;
      }
  
      if (this.collectives.length === 1) {
        if (this.collectives[0].singular && !this.collectives[0].plural) {
          return false;
        }
        if (!this.collectives[0].singular && this.collectives[0].plural) {
          return false;
        }
  
        return true;
      }
  
      for (const collective of this.collectives) {
        if (!collective.singular || !collective.plural) {
          return false;
        }
  
        if (!collective.multiplier || collective.multiplier <= 0) {
          return false;
        }
      }
    } else {
      if (!this.base || this.base <= 0) {
        return false;
      }
  
      if (this.magnitudes.length === 0) {
        return false;
      }
  
      for (const magnitude of this.magnitudes) {
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

  getAbbr(value: number): string {
    if (this.type === UnitType.Count) {
      return this.toString(value);
    } else {
      return this.pickMagnitude(value).abbrev;
    }
  }

  multiplier(value: number): number {
    if (this.type === UnitType.Count) {
      const unitCollective = this.pickCollective(value);
      return (unitCollective.multiplier ?? 1);
    } else {
      const magnitude = this.pickMagnitude(value);
      return (magnitude.multiplier ?? 1) * (this.base ?? 1);
    }
  }
  
  toString(value: number): string {
    if (this.type === UnitType.Count) {
      const unitCollective = this.pickCollective(value);
  
      if (value * (unitCollective.multiplier ?? 1) === 1) {
        return unitCollective.singular ? ` ${unitCollective.singular}` : "";
      } else {
        return unitCollective.plural ? ` ${unitCollective.plural}` : "";
      }
    } else {
      const magnitude = this.pickMagnitude(value);
      return " " + (value * (magnitude.multiplier ?? 1) * (this.base ?? 1) === 1 ? magnitude.singular : magnitude.plural);
    }
  }
  
  pickCollective(collective?: number): Collective {
    if (collective === undefined) {
      throw new Error("Collective is required for count units");
    }
  
    if (this.collectives.length === 0) {
      throw new Error(`No collectives defined for unit '${this.name}'`);
    }
  
    if (collective < 0 || collective >= this.collectives.length) {
      throw new Error(`Invalid collective index, got ${collective}, expected 0-${this.collectives.length - 1}`);
    }
  
    return this.collectives[collective];
  }
  
  pickMagnitude(value: number): Magnitude {
    if (this.magnitudes.length === 0) {
      throw new Error(`No magnitudes defined for unit '${this.name}'`);
    }
  
    let selected = this.magnitudes[0];
    let closest = Number.MAX_VALUE;
  
    this.magnitudes.forEach((magnitude) => {
      const diff = Math.abs(value / (magnitude.multiplier * (this.base ?? 1)));
      if (diff >= 1 && diff < closest) {
        closest = diff;
        selected = magnitude;
      }
    });
  
    return selected;
  }
}
