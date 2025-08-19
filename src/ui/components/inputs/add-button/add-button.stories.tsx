import { AddButton } from './add-button';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

function Buttons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AddButton
        id="add-button"
        onClick={fn()}
      />
    </div>
  );
}

const meta = {
  component: Buttons,
  args: {},
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};
