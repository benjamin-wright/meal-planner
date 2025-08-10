import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Test Title', 
  },
};