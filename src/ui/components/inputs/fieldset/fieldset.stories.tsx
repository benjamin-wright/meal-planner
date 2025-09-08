import { Fieldset } from './fieldset';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Fieldset,
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <input placeholder="Test Input" />,
    label: "Test Fieldset",
    id: "test-fieldset"
  }
};
