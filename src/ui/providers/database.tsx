import { createContext, useEffect, useState } from "react";
import { DB } from "../../persistence/interfaces/db";
import { UnitStore } from "../../persistence/interfaces/units";
import { CategoryStore } from "../../persistence/interfaces/categories";
import { IngredientStore } from "../../persistence/interfaces/ingredients";
import { RecipieStore } from "../../persistence/interfaces/recipies";
import { MealStore } from "../../persistence/interfaces/meals";
import { InedibleStore } from "../../persistence/interfaces/inedibles";
import { ShoppingStore } from "../../persistence/interfaces/shopping";

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
      setUnits(db.units());
      setCategories(db.categories());
      setIngredients(db.ingredients());
      setRecipies(db.recipies());
      setMeals(db.meals());
      setInedibles(db.inedibles());
      setShopping(db.shopping());
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
