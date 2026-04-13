import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { fn } from 'storybook/test';

function Buttons() {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button
      id="primary-button"
      content="Click me"
      onClick={fn()}
    />
    <Button
      id="disabled-button"
      content="Disabled"
      onClick={fn()}
      disabled
    />
    <Button
      id="success-button"
      content="success"
      kind="success"
      onClick={fn()}
    />
    <Button
      id="success-disabled-button"
      content="Disabled"
      kind="success"
      onClick={fn()}
      disabled
    />
    <Button
      id="error-button"
      content="error"
      kind="error"
      onClick={fn()}
    />
    <Button
      id="error-disabled-button"
      content="disabled"
      kind="error"
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
