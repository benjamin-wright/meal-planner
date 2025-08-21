import type { Meta, StoryObj } from '@storybook/react';
import { CenteredPanel } from './centered-panel';

const meta: Meta<typeof CenteredPanel> = {
  component: CenteredPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>This is centered content</div>,
  },
};
