import type { Meta, StoryObj } from '@storybook/react';
import { CategoriesView } from './categories-view';
import { MemoryRouter } from 'react-router';

const meta = {
  component: CategoriesView,
} satisfies Meta<typeof CategoriesView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    categories: [
      { id: 1, name: 'Fruits', order: 1 },
      { id: 2, name: 'Vegetables', order: 2 },
      { id: 3, name: 'Dairy', order: 3 },
      { id: 4, name: 'Meat', order: 4 },
    ],
  },
  render: (args) => {
    return <MemoryRouter>
      <CategoriesView {...args} />
    </MemoryRouter>;
  }
};
