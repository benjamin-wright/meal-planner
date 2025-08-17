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
    children: (<p>Dialog Content that is quite long and makes things grow</p>)
  },
};