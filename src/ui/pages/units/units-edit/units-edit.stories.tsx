import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnitsEditView } from './units-edit-view';
import { UnitType } from '../../../../models/units';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router';

const meta = {
  component: UnitsEditView,
} satisfies Meta<typeof UnitsEditView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    unit: {
      id: 0,
      base: 1,
      name: "Test Unit",
      type: UnitType.Weight,
      magnitudes: [],
    },
    onChange: () => { },
    onSubmit: fn(),
  },
  render: (args) => {
    const [unit, setUnit] = useState(args.unit);
    return <MemoryRouter>
      <UnitsEditView {...args} unit={unit} onChange={setUnit} />
    </MemoryRouter>;
  }
};
