import type { Meta, StoryObj } from '@storybook/react';
import { UnitsEditView } from './units-edit-view';
import { UnitType } from '../../../../models/units';
import { useState } from 'react';

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
      id: 3,
      name: "Test Unit",
      type: UnitType.Volume,
      magnitudes: [],
      collectives: [],
    },
    onChange: () => { }
  },
  render: (args) => {
    const [unit, setUnit] = useState(args.unit);
    return <UnitsEditView {...args} unit={unit} onChange={setUnit} />;
  }
};
