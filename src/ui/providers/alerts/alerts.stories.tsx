import { useContext } from 'react';
import { Button } from '../../components/inputs/button/button';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertProvider } from './alert-provider';
import { AlertContext } from './alert-context';

let count = 1;

function AlertStory() {
  const { alert } = useContext(AlertContext);

  function handleAlert() {
    alert({ message: `This is a new alert number ${count++}`, severity: "info" });
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      height: "100%",
      justifyContent: "center",
    }}>
      <Button id="alert-button" content="Alert" onClick={handleAlert} />
    </div>
  )
}

const meta = {
  component: AlertStory,
} satisfies Meta<typeof AlertStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  render: (args) => {
    return <>
      <AlertProvider>
        <AlertStory {...args} />
      </AlertProvider>
    </>;
  },
};
