import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './dialog';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    prompt: "Are you sure?",
    warning: "Some detail to explain why this might be a bad idea..."
  },
};