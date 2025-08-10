import Checklist from '@mui/icons-material/Checklist';
import { BannerButton } from './banner-button';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  component: BannerButton,
  args: {
    icon: <Checklist />,
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['Checklist'],
      mapping: {
        House: <Checklist />
      },
    },
  },
} satisfies Meta<typeof BannerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "test label"
  }
};