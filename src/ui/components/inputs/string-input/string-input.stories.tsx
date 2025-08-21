

import type { Meta, StoryObj } from '@storybook/react';
import { StringInput } from './string-input';
import { fn } from 'storybook/test';

const meta = {
  component: StringInput,
} satisfies Meta<typeof StringInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'primary',
    label: 'Primary Input',
    placeholder: 'Enter text...',
    value: 'Hello World',
    onChange: fn(),
  }
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  }
};
