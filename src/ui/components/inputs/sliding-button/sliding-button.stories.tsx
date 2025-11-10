import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SlidingButton } from './sliding-button';

const meta = {
  component: SlidingButton,
} satisfies Meta<typeof SlidingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "primary",
    title: "primary",
    onEdit: fn(),
    onDelete: fn(),
  }
};