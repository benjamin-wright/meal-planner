import { useState } from 'react';
import House from '../../icons/house';
import { IconCheckbox } from './icon-checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

function TestComponent() {
  const [selected, setSelected] = useState(false);

  return <div>
    <IconCheckbox
      icon={<House />}
      selected={selected}
      onChange={setSelected}
    />
  </div>;
}

const meta = {
  component: TestComponent,
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
