import { Unit, UnitType, format as formatUnit } from "../models/units";
import { CategoryStore } from "../persistence/interfaces/categories";
import { SettingsStore } from "../persistence/interfaces/settings";
import { ShoppingItemStore } from "../persistence/interfaces/shopping-item";
import { UnitStore } from "../persistence/interfaces/units";
import { IngredientStore } from "../persistence/interfaces/ingredients";
import { RecipieStore } from "../persistence/interfaces/recipies";
import { MealStore } from "../persistence/interfaces/meals";
import { ExtraStore } from "../persistence/interfaces/extras";
import { ShoppingItem } from "../models/shopping-item";
import { ReadyMealStore } from "../persistence/interfaces/readymeals";
import { Extra } from "../models/extras";
import { Meal, MealRecipieType } from "../models/meals";

export type ShoppingViewItem = {
  id: number;
  name: string;
  category: string;
  quantity: string;
  got: boolean;
  pending: boolean;
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
        unit = units.find((unit: Unit) => unit.id === item.unit) || {
          id: 0,
          name: "count",
          type: UnitType.Count,
          magnitudes: [],
          collectives: [{}],
          base: 1
        };
        break;
      }
    }

    if (!unit) {
      setError(`Unit not found for item ${item.name} (${item.id})`);
      continue;
    }

    const category = categories.find(category => category.id === item.category);
    if (!category) {
      setError(`Category not found for item ${item.id}`);
      continue;
    }

    items.push({
      id: item.id,
      name: item.name,
      category: category.name,
      quantity: formatUnit(unit, item.quantity, { abbr: true }),
      got: item.got,
      pending: false
    });
    
    if (!usedCategories[category.name]) {
      usedCategories[category.name] = true;
    }
  }
  return {
    items,
    categories: categories.filter(category => usedCategories[category.name]).map(category => category.name)
  };
}

export async function resetShoppingList({
  ingredientStore,
  unitStore,
  recipieStore,
  mealStore,
  readymealStore,
  extraStore,
  shoppingStore,
  setError
}: {
  ingredientStore: IngredientStore,
  unitStore: UnitStore,
  recipieStore: RecipieStore,
  mealStore: MealStore,
  readymealStore: ReadyMealStore,
  extraStore: ExtraStore,
  shoppingStore: ShoppingItemStore,
  setError: (msg: string) => void
}): Promise<void> {
  await shoppingStore.clear();

  const meals = await mealStore.getAll();
  const extras = await extraStore.getAll();
  let shoppingMap = new Map<number, ShoppingItem>();
  let readymealMap = new Map<number, ShoppingItem>();

  for (const meal of meals) {
    switch (meal.recipieType) {
      case MealRecipieType.ReadyMeal: {
        readymealMap = await processReadyMeal(meal, readymealStore, setError, readymealMap);
        break;
      }
      case MealRecipieType.Recipie: {
        shoppingMap = await processRecipie(meal, recipieStore, ingredientStore, unitStore, setError, shoppingMap);
        break;
      }
      default: {
        setError(`Unknown recipie type ${meal.recipieType} for meal ${meal.id}`);
        continue;
      }
    }
  }

  for (const extra of extras) {
    shoppingMap = await processExtra(extra, ingredientStore, unitStore, setError, shoppingMap);
  }

  for (const item of Array.from(shoppingMap.values())) {
    await shoppingStore.add(item.name, item.category, item.unitType, item.unit, item.quantity, item.got);
  }

  for (const item of Array.from(readymealMap.values())) {
    await shoppingStore.add(item.name, item.category, item.unitType, item.unit, item.quantity, item.got);
  }
}

async function processReadyMeal(
  item: Meal,
  readymealStore: ReadyMealStore,
  setError: (msg: string) => void,
  readymealMap: Map<number, ShoppingItem>
): Promise<Map<number, ShoppingItem>> {
  const readymeal = await readymealStore.get(item.recipieId);
  if (!readymeal) {
    setError(`Ready meal ${item.recipieId} not found for meal ${item.id}`);
    return readymealMap;
  }

  let found = false;
  for (const [readymealId, shoppingItem] of readymealMap) {
    if (readymealId === readymeal.id) {
      found = true;
      shoppingItem.quantity += item.servings / readymeal.serves;
      break;
    }
  }
  if (found) {
    return readymealMap;
  }

  readymealMap.set(readymeal.id, {
    id: 0,
    name: readymeal.name,
    category: readymeal.category,
    unitType: UnitType.Count,
    unit: undefined,
    quantity: item.servings / readymeal.serves,
    got: false
  });

  return readymealMap;
}

async function processRecipie(
  item: Meal,
  recipieStore: RecipieStore,
  ingredientStore: IngredientStore,
  unitStore: UnitStore,
  setError: (msg: string) => void,
  shoppingMap: Map<number, ShoppingItem>
): Promise<Map<number, ShoppingItem>> {
  const recipie = await recipieStore.get(item.recipieId);
  if (!recipie) {
    setError(`Recipie ${item.recipieId} not found for meal ${item.id}`);
    return shoppingMap;
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
        shoppingItem.quantity += recipieIngredient.quantity * item.servings / recipie.serves;
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
      quantity: recipieIngredient.quantity * item.servings / recipie.serves,
      got: false
    });
  }

  return shoppingMap;
}

async function processExtra(
  item: Extra,
  ingredientStore: IngredientStore,
  unitStore: UnitStore,
  setError: (msg: string) => void,
  shoppingMap: Map<number, ShoppingItem>
): Promise<Map<number, ShoppingItem>> {
  const ingredient = await ingredientStore.get(item.ingredient);
  if (!ingredient) {
    setError(`Ingredient ${item.ingredient} not found for extra ${item.id}`);
    return shoppingMap;
  }
  const unit = await unitStore.get(item.unit);
  if (!unit) {
    setError(`Unit ${item.unit} not found for extra ${item.id}`);
    return shoppingMap;
  }

  let found = false;
  for (const [recipieId, shoppingItem] of shoppingMap) {
    if (recipieId === item.ingredient && shoppingItem.unitType === unit.type) {
      found = true;
      shoppingItem.quantity += item.quantity;
      break;
    }
  }
  if (found) {
    return shoppingMap;
  }
  shoppingMap.set(ingredient.id, {
    id: 0,
    name: ingredient.name,
    category: ingredient.category,
    unitType: unit.type,
    unit: unit.type === UnitType.Count ? unit.id : undefined,
    quantity: item.quantity,
    got: false
  });

  return shoppingMap;
}