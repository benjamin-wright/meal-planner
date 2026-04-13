import { useState } from 'react';
import { NumericInput } from './numeric-input';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

function TestComponent({ fn }: { fn: (value: number) => void }) {
  const [value, setValue] = useState(0);
  return <div>
    <NumericInput id="test" label="Test" value={value} onChange={value => {
      setValue(value);
      fn(value);
    }} />
    <button onClick={() => setValue(value + 1)}>Increase</button>
  </div>;
}

const meta = {
  component: TestComponent,
  args: {},
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fn: fn()
  }
};
