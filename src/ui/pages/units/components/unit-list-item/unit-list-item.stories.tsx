import type { Meta, StoryObj } from '@storybook/react';
import { UnitListItem } from './unit-list-item';
import { UnitType } from '../../../../../models/units';

const meta = {
  component: UnitListItem,
} satisfies Meta<typeof UnitListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    unit: {
      id: 1,
      name: 'litre',
      type: UnitType.Volume,
      collectives: [],
      magnitudes: []
    }
  },
};