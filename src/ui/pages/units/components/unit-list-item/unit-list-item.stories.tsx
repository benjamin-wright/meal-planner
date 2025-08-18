import type { Meta, StoryObj } from '@storybook/react';
import { UnitListItem } from './unit-list-item';
import { UnitType } from '../../../../../models/units';
import { Accordion } from '../../../../components/containers/accordion/accordion';
import { fn } from 'storybook/test';

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
      magnitudes: [
        { abbrev: 'l', singular: 'litre', plural: 'litres', multiplier: 1 },
        { abbrev: 'ml', singular: 'millilitre', plural: 'millilitres', multiplier: 0.001 }
      ]
    },
    onEdit: fn(),
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <Accordion>
        <Story />
      </Accordion>
    )
  ]
};
