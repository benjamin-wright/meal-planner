import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { IngredientSelect } from './ingredient-select';
import { ItemKind } from '../../../../../models/items';

function IngredientSelectStory() {
  const [selected, setSelected] = useState(6);
  const ingredients = [
    { id: 1, name: "Apple", category: 1, kind: ItemKind.Ingredient },
    { id: 2, name: "Banana", category: 1, kind: ItemKind.Ingredient },
    { id: 3, name: "Carrot", category: 2, kind: ItemKind.Ingredient },
    { id: 4, name: "Doughnut", category: 3, kind: ItemKind.Ingredient },
    { id: 5, name: "Eggplant", category: 2, kind: ItemKind.Ingredient },
    { id: 6, name: "Fish", category: 2, kind: ItemKind.Ingredient },
    { id: 7, name: "Grapes", category: 1, kind: ItemKind.Ingredient },
    { id: 8, name: "Honey", category: 4, kind: ItemKind.Ingredient },
    { id: 9, name: "Ice Cream", category: 3, kind: ItemKind.Ingredient },
    { id: 10, name: "Juice", category: 1, kind: ItemKind.Ingredient },
  ];

  return <IngredientSelect
      title={`Ingredient ${1}`}
      isOpen={true}
      selected={selected}
      ingredients={ingredients}
      onChange={id => setSelected(id)}
    />
  }
  
const meta = {
  component: IngredientSelectStory,
} satisfies Meta<typeof IngredientSelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
