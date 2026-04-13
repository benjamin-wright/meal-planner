import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotFound } from './not-found';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: NotFound,
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  render: (args) => {
    return <MemoryRouter>
      <NotFound {...args} />
    </MemoryRouter>;
  },
};
