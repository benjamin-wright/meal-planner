import { Backdrop } from './backdrop';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Backdrop,
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};