import { Unit, UnitType } from "../models/units";
import { CategoryStore } from "../persistence/interfaces/categories";
import { SettingsStore } from "../persistence/interfaces/settings";
import { ShoppingItemStore } from "../persistence/interfaces/shopping-item";
import { UnitStore } from "../persistence/interfaces/units";
import { IngredientStore } from "../persistence/interfaces/ingredients";
import { RecipieStore } from "../persistence/interfaces/recipies";
import { MealStore } from "../persistence/interfaces/meals";
import { ExtraStore } from "../persistence/interfaces/extras";
import { ShoppingItem } from "../models/shopping-item";

export type ShoppingViewItem = {
  id: number;
  name: string;
  category: string;
  quantity: string;
  got: boolean;
  pending?: boolean;
};

export async function getShoppingListItems({
  settingStore,
  shoppingStore,
  categoryStore,
  unitStore,
  setError
}: {
  settingStore: SettingsStore,
  shoppingStore: ShoppingItemStore,
  categoryStore: CategoryStore,
  unitStore: UnitStore,
  setError: (msg: string) => void
}): Promise<{ items: ShoppingViewItem[], categories: string[] }> {
  if (!settingStore || !shoppingStore || !categoryStore || !unitStore) {
    return { items: [], categories: [] };
  }

  const settings = await settingStore.get();
  const units = await unitStore.getAll();
  const categories = await categoryStore.getAll();

  const weightUnit = units.find((unit: Unit) => unit.id === settings.preferredWeightUnit);
  const volumeUnit = units.find((unit: Unit) => unit.id === settings.preferredVolumeUnit);
  if (!weightUnit || !volumeUnit) {
    setError("Weight or volume unit not found in settings");
    return { items: [], categories: [] };
  }

  const shoppingItems = await shoppingStore.getAll();
  const items: ShoppingViewItem[] = [];
  const usedCategories: Record<string, boolean> = {};

  for (const item of shoppingItems) {
    let unit: Unit | undefined = undefined;
    switch (item.unitType) {
      case UnitType.Weight:
        unit = weightUnit;
        break;
      case UnitType.Volume:
        unit = volumeUnit;
        break;
      case UnitType.Count: {
        const countUnit = units.find((unit: Unit) => unit.id === item.unit)
        if (!countUnit) {
          setError(`Failed to find count unit for ${item.name} (${item.id})`);
          continue;
        }
        unit = countUnit;
        break;
      }
    }
    if (!unit) {
      setError(`Unit not found for item ${item.name} (${item.id})`);
      continue;
    }
    const category = categories.find((category: any) => category.id === item.category);
    if (!category) {
      setError(`Category not found for item ${item.id}`);
      continue;
    }
    items.push({
      id: item.id,
      name: item.name,
      category: category.name,
      quantity: unit.format(item.quantity, { abbr: true }),
      got: item.got
    });
    if (!usedCategories[category.name]) {
      usedCategories[category.name] = true;
    }
  }
  return {
    items,
    categories: categories.filter((category: any) => usedCategories[category.name]).map((category: any) => category.name)
  };
}

export async function resetShoppingList({
  ingredientStore,
  unitStore,
  recipieStore,
  mealStore,
  extraStore,
  shoppingStore,
  setError
}: {
  ingredientStore: IngredientStore,
  unitStore: UnitStore,
  recipieStore: RecipieStore,
  mealStore: MealStore,
  extraStore: ExtraStore,
  shoppingStore: ShoppingItemStore,
  setError: (msg: string) => void
}): Promise<void> {
  await shoppingStore.clear();

  const meals = await mealStore.getAll();
  const extras = await extraStore.getAll();
  const shoppingMap = new Map<number, ShoppingItem>();

  for (const meal of meals) {
    const recipie = await recipieStore.get(meal.recipieId);
    if (!recipie) {
      setError(`Recipie ${meal.recipieId} not found for meal ${meal.id}`);
      continue;
    }
    for (const recipieIngredient of recipie.ingredients) {
      const ingredient = await ingredientStore.get(recipieIngredient.id);
      if (!ingredient) {
        setError(`Ingredient ${recipieIngredient.id} not found for recipie ${recipie.id}`);
        continue;
      }
      const unit = await unitStore.get(recipieIngredient.unit);
      if (!unit) {
        setError(`Unit ${recipieIngredient.unit} not found for recipie ${recipie.id}`);
        continue;
      }
      let found = false;
      for (const [ingredientId, shoppingItem] of shoppingMap) {
        if (recipieIngredient.id === ingredientId && shoppingItem.unitType === unit.type) {
          found = true;
          shoppingItem.quantity += recipieIngredient.quantity * meal.servings / recipie.serves;
          break;
        }
      }
      if (found) {
        continue;
      }
      shoppingMap.set(ingredient.id, {
        id: 0,
        name: ingredient.name,
        category: ingredient.category,
        unitType: unit.type,
        unit: unit.type === UnitType.Count ? unit.id : undefined,
        quantity: recipieIngredient.quantity * meal.servings / recipie.serves,
        got: false
      });
    }
  }

  for (const extra of extras) {
    const ingredient = await ingredientStore.get(extra.ingredient);
    if (!ingredient) {
      setError(`Ingredient ${extra.ingredient} not found for extra ${extra.id}`);
      continue;
    }
    const unit = await unitStore.get(extra.unit);
    if (!unit) {
      setError(`Unit ${extra.unit} not found for extra ${extra.id}`);
      continue;
    }
    let found = false;
    for (const [recipieId, shoppingItem] of shoppingMap) {
      if (recipieId === extra.ingredient && shoppingItem.unitType === unit.type) {
        found = true;
        shoppingItem.quantity += extra.quantity;
        break;
      }
    }
    if (found) {
      continue;
    }
    shoppingMap.set(ingredient.id, {
      id: 0,
      name: ingredient.name,
      category: ingredient.category,
      unitType: unit.type,
      unit: unit.type === UnitType.Count ? unit.id : undefined,
      quantity: extra.quantity,
      got: false
    });
  }

  const items = Array.from(shoppingMap.values());
  for (const item of items) {
    await shoppingStore.add(item.name, item.category, item.unitType, item.unit, item.quantity, item.got);
  }
}