import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { fn } from 'storybook/test';

function Buttons() {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button
      content="Click me"
      onClick={fn()}
    />
    <Button
      content="Disabled"
      onClick={fn()}
      disabled
    />
    <Button
      content="success"
      kind="success"
      onClick={fn()}
    />
    <Button
      content="Disabled"
      kind="success"
      onClick={fn()}
      disabled
    />
    <Button
      content="error"
      kind="error"
      onClick={fn()}
    />
    <Button
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