import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SlidingButtonGroup } from './sliding-button-group';
import { SlidingButton } from './sliding-button';

const meta = {
  component: SlidingButtonGroup,
} satisfies Meta<typeof SlidingButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em'
      }}>
        <SlidingButton id="item1" title="Item 1" onEdit={fn()} onDelete={fn()} />
        <SlidingButton id="item2" title="An item with a really really long name" onEdit={fn()} onDelete={fn()} />
        <SlidingButton id="item3" title="Item 3" onEdit={fn()} onDelete={fn()} />
      </div>
    )
  }
};