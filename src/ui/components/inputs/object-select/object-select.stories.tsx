import { ObjectSelect } from './object-select';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  component: ObjectSelect,
} satisfies Meta<typeof ObjectSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "test label",
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
    ],
    value: null,
    onChange: fn(),
    toDisplay: (option: any) => option.name,
    toKey: (value: any) => value?.id ?? "",
  }
};