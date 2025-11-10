import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptiveButton } from './descriptive-button';
import { fn } from 'storybook/test';

function Buttons() {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <DescriptiveButton
      description="some example description for a standard button"
      content="Click me"
      onClick={fn()}
    />
    <DescriptiveButton
      description="some example description for a success button"
      content="success"
      kind="success"
      onClick={fn()}
    />
    <DescriptiveButton
      description="some example description for an error button"
      content="error"
      kind="error"
      onClick={fn()}
    />
    <DescriptiveButton
      description="some example description for a disabled error button"
      content="disabled"
      kind="success"
      onClick={fn()}
      disabled
    />
  </div>
}

const meta = {
  component: Buttons,
  args: {},
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  }
};