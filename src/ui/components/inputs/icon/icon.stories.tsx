import House from '@mui/icons-material/House';
import { Icon } from './icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: <House />
  },
};