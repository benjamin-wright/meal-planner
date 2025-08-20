import { AlertView } from './alert-view';

import type { Meta, StoryObj } from '@storybook/react';

function Alerts() {
  const startTime = Date.now();
  const endTime = startTime + 5000; // Alert duration of 5 seconds 

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
    <AlertView alert={{ message: 'This is an info message', severity: 'info' }} startTime={startTime} endTime={endTime} />
    <AlertView alert={{ message: 'This is a warning message', severity: 'warning' }} />
    <AlertView alert={{ message: 'This is an error message', severity: 'error' }} />
  </div>
}

const meta = {
  component: Alerts,
} satisfies Meta<typeof Alerts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return <Alerts {...args} />;
  }
};
