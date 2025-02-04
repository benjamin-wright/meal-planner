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
import { PlanItemStore } from "../../persistence/interfaces/plan-items";
import { PlanItems } from "../../persistence/IndexedDB/plan-items";

interface DBContextProps {
  db?: DB;
  unitStore?: UnitStore;
  categoryStore?: CategoryStore;
  ingredientStore?: IngredientStore;
  recipieStore?: RecipieStore;
  planItemStore?: PlanItemStore;
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
  const [planItemStore, setPlanItems] = useState<PlanItemStore | undefined>(undefined);

  useEffect(() => {
    database.then((db: DB) => {
      setDB(db);
      setUnits(new Units(db));
      setCategories(new Categories(db));
      setIngredients(new Ingredients(db));
      setRecipies(new Recipies(db));
      setPlanItems(new PlanItems(db));
    });
  }, [database])

  return (
    <DBContext.Provider
      value={{ db, unitStore, categoryStore, ingredientStore, recipieStore, planItemStore }}
    >
      {children}
    </DBContext.Provider>
  );
}
