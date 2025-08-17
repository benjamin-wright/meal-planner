import { AlertsView } from './alerts-view';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: AlertsView,
} satisfies Meta<typeof AlertsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {},
};