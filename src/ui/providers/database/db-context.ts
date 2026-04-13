import { createContext } from "react";
import { DB } from "../../../persistence/interfaces/db";
import { UnitStore } from "../../../persistence/interfaces/units";
import { CategoryStore } from "../../../persistence/interfaces/categories";
import { ItemStore } from "../../../persistence/interfaces/item";
import { RecipieStore } from "../../../persistence/interfaces/recipies";
import { MealStore } from "../../../persistence/interfaces/meals";
import { ExtraStore } from "../../../persistence/interfaces/extras";
import { ShoppingItemStore } from "../../../persistence/interfaces/shopping-item";

export type Stores = {
  unitStore: UnitStore;
  categoryStore: CategoryStore;
  itemStore: ItemStore;
  recipieStore: RecipieStore;
  mealStore: MealStore;
  extraStore: ExtraStore;
  shoppingStore: ShoppingItemStore;
}

interface DBContextProps {
  db?: DB;
  dbName: string;
  stores?: Stores;
}

export const DBContext = createContext<DBContextProps>({dbName: "unknown"});
