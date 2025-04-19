import { describe, it, expect } from 'vitest';
import { Unit, UnitType } from './units';

const validCounts = [
  {
    id: 1,
    name: 'unnamed',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: '', plural: '' }
    ],
  },
  {
    id: 1,
    name: 'single named',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices' }
    ],
  },
  {
    id: 1,
    name: 'multiple',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices', multiplier: 1 },
      { singular: 'piece', plural: 'pieces', multiplier: 10 }
    ],
  },
]

const invalidCounts = [
  {
    id: 1,
    name: 'empty',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [],
  },
  {
    id: 1,
    name: 'single missing plural',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: '' }
    ],
  },
  {
    id: 1,
    name: 'single missing singular',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: '', plural: 'slices' }
    ],
  },
  {
    id: 1,
    name: 'multiple missing singular',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: '', plural: 'slices', multiplier: 1 },
      { singular: 'piece', plural: 'pieces', multiplier: 10 }
    ],
  },
  {
    id: 1,
    name: 'multiple missing plural',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices', multiplier: 1 },
      { singular: '', plural: 'pieces', multiplier: 10 }
    ],
  },
  {
    id: 1,
    name: 'multiple missing multiplier',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices', multiplier: 1 },
      { singular: 'piece', plural: 'pieces' }
    ],
  },
  {
    id: 1,
    name: 'multiple zero multiplier',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices', multiplier: 1 },
      { singular: 'piece', plural: 'pieces', multiplier: 0 }
    ],
  },
  {
    id: 1,
    name: 'multiple negative multiplier',
    type: UnitType.Count,
    magnitudes: [],
    collectives: [
      { singular: 'slice', plural: 'slices', multiplier: 1 },
      { singular: 'piece', plural: 'pieces', multiplier: -10 }
    ],
  },
]

const validMagnitudes = [
  {
    id: 1,
    name: 'single volume',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 1, abbrev: 'l' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple volume',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 1, abbrev: 'l' },
      { singular: 'millilitre', plural: 'millilitres', multiplier: 0.001, abbrev: 'ml' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'single weight',
    type: UnitType.Weight,
    base: 1,
    magnitudes: [
      { singular: 'gram', plural: 'grams', multiplier: 1, abbrev: 'g' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple weight',
    type: UnitType.Weight,
    base: 1,
    magnitudes: [
      { singular: 'gram', plural: 'grams', multiplier: 1, abbrev: 'g' },
      { singular: 'kilogram', plural: 'kilograms', multiplier: 1000, abbrev: 'kg' }
    ],
    collectives: [],
  }
];

const invalidMagnitudes = [
  {
    id: 1,
    name: 'empty volume',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [],
    collectives: [],
  },
  {
    id: 1,
    name: 'single volume missing plural',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: '', multiplier: 1, abbrev: 'l' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'single volume missing singular',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: '', plural: 'litres', multiplier: 1, abbrev: 'l' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'single volume zero multiplier',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 0, abbrev: 'l' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'single volume negative multiplier',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: -1, abbrev: 'l' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple volume missing singular',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: '', plural: 'litres', multiplier: 1, abbrev: 'l' },
      { singular: 'millilitre', plural: 'millilitres', multiplier: 0.001, abbrev: 'ml' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple volume missing plural',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 1, abbrev: 'l' },
      { singular: '', plural: 'millilitres', multiplier: 0.001, abbrev: 'ml' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple volume zero multiplier',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 1, abbrev: 'l' },
      { singular: 'millilitre', plural: 'millilitres', multiplier: 0, abbrev: 'ml' }
    ],
    collectives: [],
  },
  {
    id: 1,
    name: 'multiple volume negative multiplier',
    type: UnitType.Volume,
    base: 1,
    magnitudes: [
      { singular: 'litre', plural: 'litres', multiplier: 1, abbrev: 'l' },
      { singular: 'millilitre', plural: 'millilitres', multiplier: -0.001, abbrev: 'ml' }
    ],
    collectives: [],
  },
]

describe('units', () => {
  describe('validate', () => {
    describe('valid counts', () => {
      validCounts.forEach(unit => {
        it(unit.name, () => {
          expect(Unit.from(unit).validate()).toBe(true);
        });
      });
    });

    describe('invalid counts', () => {
      invalidCounts.forEach(unit => {
        it(unit.name, () => {
          expect(Unit.from(unit).validate()).toBe(false);
        });
      });
    });

    describe('valid magnitudes', () => {
      validMagnitudes.forEach(unit => {
        it(unit.name, () => {
          expect(Unit.from(unit).validate()).toBe(true);
        });
      });
    });

    describe('invalid magnitudes', () => {
      invalidMagnitudes.forEach(unit => {
        it(unit.name, () => {
          expect(Unit.from(unit).validate()).toBe(false);
        });
      });
    });
  });
});