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
    onChange: () => { }
  },
  render: (args) => {
    const [item, setItem] = useState(args.item);

    return <MemoryRouter>
      <ItemsEditView
        item={item}
        onChange={setItem}
      />
    </MemoryRouter>;
  }
};
