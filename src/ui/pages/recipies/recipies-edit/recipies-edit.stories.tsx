import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipiesEditView } from './recipies-edit-view';
import { MemoryRouter } from 'react-router';
import { useState } from 'react';
import { CourseType, DishType } from '../../../../models/meals';
import { ItemKind } from '../../../../models/items';

const meta = {
  component: RecipiesEditView,
} satisfies Meta<typeof RecipiesEditView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    recipe: {
      id: 1,
      name: 'Pancakes',
      description: 'Fluffy pancakes',
      serves: 4,
      time: 20,
      course: CourseType.Dinner,
      dish: DishType.Main,
      ingredients: [
        { id: 1, quantity: 200, unit: 1 },
        { id: 2, quantity: 200, unit: 1 }
      ],
      steps: [],
    },
    items: [
      { id: 1, name: "Flour", category: 1, kind: ItemKind.Ingredient },
      { id: 2, name: "Eggs", category: 1, kind: ItemKind.Ingredient },
      { id: 3, name: "Milk", category: 1, kind: ItemKind.Ingredient },
      { id: 4, name: "Sugar", category: 1, kind: ItemKind.Ingredient },
      { id: 5, name: "Salt", category: 1, kind: ItemKind.Ingredient },
    ],
    units: [],
    isNew: false,
    onChange: () => { },
    onSubmit: () => { },
    onNewIngredient: () => { }
  },
  render: (args) => {
    const [recipe, setRecipe] = useState(args.recipe);

    return <MemoryRouter>
      <RecipiesEditView
        recipe={recipe}
        items={args.items}
        units={args.units}
        isNew={args.isNew}
        onSubmit={args.onSubmit}
        onChange={setRecipe}
        onNewIngredient={() => {
          const newIngredient = {
            id: 0,
            quantity: 0,
            unit: 0,
          };

          setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, newIngredient]
          });
        }}
      />
    </MemoryRouter>;
  }
};
