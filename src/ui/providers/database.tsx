import { createContext, useEffect, useState } from "react";
import { DB } from "../../persistence/IndexedDB/db";
import { UnitStore } from "../../persistence/interfaces/units";
import { Units } from "../../persistence/IndexedDB/units";
import { CategoryStore } from "../../persistence/interfaces/categories";
import { Categories } from "../../persistence/IndexedDB/categories";
import { IngredientStore } from "../../persistence/interfaces/ingredients";
import { Ingredients } from "../../persistence/IndexedDB/ingredients";
import { RecipieStore } from "../../persistence/interfaces/recipies";
import { Recipies } from "../../persistence/IndexedDB/recipies";
import { MealStore } from "../../persistence/interfaces/meals";
import { Meals } from "../../persistence/IndexedDB/meals";
import { InedibleStore } from "../../persistence/interfaces/inedibles";
import { Inedibles } from "../../persistence/IndexedDB/inedibles";
import { ShoppingStore } from "../../persistence/interfaces/shopping";
import { Shopping } from "../../persistence/IndexedDB/shopping";

interface DBContextProps {
  db?: DB;
  unitStore?: UnitStore;
  categoryStore?: CategoryStore;
  ingredientStore?: IngredientStore;
  recipieStore?: RecipieStore;
  mealStore?: MealStore;
  inedibleStore?: InedibleStore;
  shoppingStore?: ShoppingStore;
}

export const DBContext = createContext<DBContextProps>({});

interface DBProviderProps {
  children: React.ReactNode;
  database: Promise<DB>;
}

export function DBProvider({ children, database }: DBProviderProps) {
  const [db, setDB] = useState<DB | undefined>(undefined);
  const [unitStore, setUnits] = useState<UnitStore | undefined>(undefined);
  const [categoryStore, setCategories] = useState<CategoryStore | undefined>(undefined);
  const [ingredientStore, setIngredients] = useState<IngredientStore | undefined>(undefined);
  const [recipieStore, setRecipies] = useState<RecipieStore | undefined>(undefined);
  const [mealStore, setMeals] = useState<MealStore | undefined>(undefined);
  const [inedibleStore, setInedibles] = useState<InedibleStore | undefined>(undefined);
  const [shoppingStore, setShopping] = useState<ShoppingStore | undefined>(undefined);

  useEffect(() => {
    database.then((db: DB) => {
      setDB(db);
      setUnits(new Units(db));
      setCategories(new Categories(db));
      setIngredients(new Ingredients(db));
      setRecipies(new Recipies(db));
      setMeals(new Meals(db));
      setInedibles(new Inedibles(db));
      setShopping(new Shopping(db));
    });
  }, [database])

  return (
    <DBContext.Provider
      value={{ db, unitStore, categoryStore, ingredientStore, recipieStore, mealStore, inedibleStore, shoppingStore }}
    >
      {children}
    </DBContext.Provider>
  );
}
