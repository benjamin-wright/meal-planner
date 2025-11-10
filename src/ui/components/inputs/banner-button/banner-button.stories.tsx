import House from '../../icons/house';
import { BannerButton } from './banner-button';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  component: BannerButton,
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
} satisfies Meta<typeof BannerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "test label",
    onClick: fn()
  }
};