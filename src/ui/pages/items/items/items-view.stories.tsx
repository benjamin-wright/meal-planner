import type { Meta, StoryObj } from '@storybook/react-vite';
import { ItemsView } from './items-view';
import { MemoryRouter } from 'react-router';
import { useState } from 'react';
import { Item, ItemKind } from '../../../../models/items';
import { fn } from 'storybook/test';

const meta = {
  component: ItemsView,
} satisfies Meta<typeof ItemsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    items: [
      { id: 1, kind: ItemKind.Ingredient, name: 'Apple', category: 1 },
      { id: 2, kind: ItemKind.Ingredient, name: 'Banana', category: 1 },
      { id: 3, kind: ItemKind.Ingredient, name: 'Carrot', category: 2 },
      { id: 4, kind: ItemKind.Ingredient, name: 'Broccoli', category: 2 },
    ],
    onDelete: () => { },
    onEdit: fn(),
  },
  render: (args) => {
    const [items, setItems] = useState(args.items);

    return <MemoryRouter>
      <ItemsView
        items={items}
        onDelete={(item: Item) => setItems(items.filter(i => i.id !== item.id))}
        onEdit={args.onEdit}
      />
    </MemoryRouter>;
  }
};
