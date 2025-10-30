import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { UnitsView } from './units-view';
import { UnitType } from '../../../../models/units';
import { useState } from 'react';
import { Memory } from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';

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
      { id: 1, name: 'litre', base: 1, type: UnitType.Volume, magnitudes: [{ abbrev: "l", singular: "litre", plural: "litres", multiplier: 1 }] },
      { id: 2, name: 'grams', base: 1, type: UnitType.Weight, magnitudes: [{ abbrev: "g", singular: "gram", plural: "grams", multiplier: 1 }] },
    ],
    unitType: UnitType.Weight,
    onTypeChanged: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onNew: fn(),
  },
  render: (args) => {
    const [unitType, setUnitType] = useState<UnitType>(UnitType.Weight);
    return <MemoryRouter>
      <UnitsView {...args} unitType={unitType} onTypeChanged={setUnitType} units={args.units.filter(u => u.type === unitType)} />
    </MemoryRouter>;
  }
};
