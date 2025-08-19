import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { UnitsView } from './units-view';
import { UnitType } from '../../../models/units';

const meta = {
  component: UnitsView,
} satisfies Meta<typeof UnitsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    units: [
      { id: 1, name: 'litre', type: UnitType.Volume, collectives: [], magnitudes: [{ abbrev: "l", singular: "litre", plural: "litres", multiplier: 1 }] },
      { id: 2, name: 'grams', type: UnitType.Weight, collectives: [], magnitudes: [{ abbrev: "g", singular: "gram", plural: "grams", multiplier: 1 }] },
    ],
    onBack: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onNew: fn(),
  },
};
