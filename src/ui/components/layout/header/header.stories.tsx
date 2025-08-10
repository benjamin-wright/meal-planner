import { Header } from './header';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    title: 'Test Title',
    onHome: fn()
  },
};