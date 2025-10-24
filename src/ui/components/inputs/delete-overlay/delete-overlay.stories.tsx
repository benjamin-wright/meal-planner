import type { Meta, StoryObj } from '@storybook/react';
import { DeleteOverlay } from './delete-overlay';
import { Fieldset } from '../fieldset/fieldset';
import { StringInput } from '../string-input/string-input';

const meta = {
  component: DeleteOverlay,
  args: {},
} satisfies Meta<typeof DeleteOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'delete-overlay',
    deleting: true,
    onClick: () => {}
  },
  render: (args) => <Fieldset id="delete-overlay" label="test">
    <StringInput id="test-input" label="Test Input" value="Test" onChange={() => {}} />
    <StringInput id="test-input-2" label="Test Input 2" value="Test 2" onChange={() => {}} />
    <DeleteOverlay {...args} />
</Fieldset>
};
