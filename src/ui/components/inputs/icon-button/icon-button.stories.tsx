import House from '@mui/icons-material/House';
import { IconButton } from './icon-button';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  component: IconButton,
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: fn(),
  }
};

export const Circular: Story = {
  args: {
    onClick: fn(),
    circular: true,
  }
};
