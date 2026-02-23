import type { Meta, StoryObj } from '@storybook/react-vite';
import { ItemsEditView } from './items-edit-view';
import { MemoryRouter } from 'react-router';
import { useState } from 'react';
import { ItemKind } from '../../../../models/items';

const meta = {
  component: ItemsEditView,
} satisfies Meta<typeof ItemsEditView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    item: { id: 1, kind: ItemKind.Ingredient, name: 'apple', category: 1 },
    isNew: false,
    categories: [
      { id: 1, name: "Fruit", order: 1 },
      { id: 2, name: "Vegetables", order: 2 },
      { id: 3, name: "Readymeals", order: 3 },
      { id: 4, name: "Household", order: 4 },
    ],
    onChange: () => { },
    onSubmit: () => { },
    onNewCategory: () => { }
  },
  render: (args) => {
    const [item, setItem] = useState(args.item);

    return <MemoryRouter>
      <ItemsEditView
        item={item}
        isNew={args.isNew}
        categories={args.categories}
        onChange={setItem}
        onSubmit={args.onSubmit}
        onNewCategory={args.onNewCategory}
      />
    </MemoryRouter>;
  }
};
