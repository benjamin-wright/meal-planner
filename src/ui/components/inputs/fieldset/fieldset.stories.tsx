import { Fieldset } from './fieldset';

import type { Meta, StoryObj } from '@storybook/react-vite';

function TestComponent() {
  return <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
    <Fieldset label="Control Fieldset" id="test-fieldset">
      <input placeholder="Test Input" />
    </Fieldset>

    <Fieldset label="Group Fieldset" id="grouped-fieldset" group>
      <input placeholder="Test Input 1" />
      <input placeholder="Test Input 2" />
    </Fieldset>
  </div>;
}

const meta = {
  component: TestComponent,
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
