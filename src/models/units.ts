import { FixJSRounding } from "../utils/number";

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

  toMagnitude(value: number, magnitude: Magnitude): number {
    if (this.type === UnitType.Count) {
      throw new Error(`Cannot convert to magnitude for unit type ${this.type}`);
    }

    return FixJSRounding(value / ((this.base ?? 1) * magnitude.multiplier));
  }

  fromMagnitude(value: number, magnitude: Magnitude): number {
    if (this.type === UnitType.Count) {
      throw new Error(`Cannot convert from magnitude for unit type ${this.type}`);
    }
    return FixJSRounding(value * ((this.base ?? 1) * magnitude.multiplier));
  }

  toCollective(value: number, collective: Collective): number {
    if (this.type !== UnitType.Count) {
      throw new Error(`Cannot convert to collective for unit type ${this.type}`);
    }

    return FixJSRounding(value / (collective.multiplier ?? 1));
  }

  fromCollective(value: number, collective: Collective): number {
    if (this.type !== UnitType.Count) {
      throw new Error(`Cannot convert from collective for unit type ${this.type}`);
    }
    return FixJSRounding(value * (collective.multiplier ?? 1));
  }

  format(value: number, options?: {abbr?: boolean}): string {
    switch(this.type) {
      case UnitType.Count:
        return this.formatCollective(value);
      case UnitType.Weight:
      case UnitType.Volume:
        return this.formatMagnitude(value, options?.abbr);
      default:
        throw new Error(`Unknown unit type: ${this.type}`);
    }
  }

  private formatCollective(value: number): string {
    const collective = this.pickCollective(value);
    const adjustedValue = value / (collective.multiplier ?? 1);
    let suffix = "";
    if (adjustedValue === 1 && collective.singular) {
      suffix = ` ${collective.singular}`;
    } else if (collective.plural) {
      suffix = ` ${collective.plural}`;
    }

    return `${this.round(adjustedValue, 3)}${suffix}`;
  }

  private formatMagnitude(value: number, abbr?: boolean): string {
    const magnitude = this.pickMagnitude(value);
    const adjustedValue = value / (magnitude.multiplier * (this.base ?? 1));

    if (abbr) {
      return `${this.round(adjustedValue, 3)}${magnitude.abbrev}`;
    }

    let unitSuffix = "";
    if (adjustedValue === 1 && magnitude.singular) {
      unitSuffix = ` ${magnitude.singular}`;
    } else if (magnitude.plural) {
      unitSuffix = ` ${magnitude.plural}`;
    }
    return `${this.round(adjustedValue, 3)}${unitSuffix}`;
  }

  private round(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
  
  pickCollective(value: number): Collective {
    if (this.collectives.length === 0) {
      throw new Error(`No collectives defined for unit '${this.name}'`);
    }

    if (this.collectives.length === 1) {
      return this.collectives[0];
    }

    let selected = this.collectives[0];
    let closest = Number.MAX_VALUE;
  
    this.collectives.forEach((collective) => {
      const diff = Math.abs(value / (collective.multiplier ?? 1));
      if (diff >= 1 && diff < closest) {
        closest = diff;
        selected = collective;
      }
    });
  
    return selected;
  }
  
  pickMagnitude(value: number): Magnitude {
    if (this.magnitudes.length === 0) {
      throw new Error(`No magnitudes defined for unit '${this.name}'`);
    }
  
    let selected = this.magnitudes[0];
    let closest = Number.MAX_VALUE;
  
    this.magnitudes.forEach((magnitude) => {
      const diff = Math.abs(value / (magnitude.multiplier * (this.base ?? 1)));
      if (diff >= 0.99 && diff < closest) {
        closest = diff;
        selected = magnitude;
      }
    });
  
    return selected;
  }
}
