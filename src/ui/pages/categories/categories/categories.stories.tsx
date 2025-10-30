import type { Meta, StoryObj } from '@storybook/react';
import { CategoriesView } from './categories-view';
import { MemoryRouter } from 'react-router';
import { useState } from 'react';

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
    categories: [],
    onReorder: () => { }
  },
  render: () => {
    const [categories, setCategories] = useState([
      { id: 1, name: 'Fruits', order: 1 },
      { id: 2, name: 'Vegetables', order: 2 },
      { id: 3, name: 'Dairy', order: 3 },
      { id: 4, name: 'Meat', order: 4 },
    ]);

    return <MemoryRouter>
      <CategoriesView categories={categories} onReorder={setCategories} />
    </MemoryRouter>;
  }
};
