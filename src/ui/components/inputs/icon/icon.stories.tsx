import House from '@mui/icons-material/House';
import { Icon } from './icon';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  component: Icon,
  args: {
    icon: <House />,
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['House'],
      mapping: {
        House: <House />
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    onClick: fn(),
    id: "test-id",
    label: "test-label"
  }
};