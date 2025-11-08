import { Meta, StoryObj } from '@storybook/react';
import { SlideOutControls } from './slide-out-controls';

const meta: Meta<typeof SlideOutControls> = {
  component: SlideOutControls,
};

export default meta;

type Story = StoryObj<typeof SlideOutControls>;

export const Default: Story = {
  render: () => (
    <SlideOutControls>
      <p style={{
        userSelect: 'none',
        padding: '1em',
        background: 'var(--thick-glazing)',
        borderRadius: '1em',
      }}>Slide Out Content</p>
    </SlideOutControls>
  )
};