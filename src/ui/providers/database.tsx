import { createContext, useContext, useEffect, useState } from "react";
import { DB } from "../../persistence/interfaces/db";
import { UnitStore } from "../../persistence/interfaces/units";
import { CategoryStore } from "../../persistence/interfaces/categories";
import { IngredientStore } from "../../persistence/interfaces/ingredients";
import { RecipieStore } from "../../persistence/interfaces/recipies";
import { MealStore } from "../../persistence/interfaces/meals";
import { ExtraStore } from "../../persistence/interfaces/extras";
import { ShoppingItemStore } from "../../persistence/interfaces/shopping-item";
import { SettingsStore } from "../../persistence/interfaces/settings";
import { AlertContext } from "./alerts";
import { ReadyMealStore } from "../../persistence/interfaces/readymeals";

type Stores = {
  unitStore: UnitStore;
  categoryStore: CategoryStore;
  ingredientStore: IngredientStore;
  readymealStore: ReadyMealStore;
  recipieStore: RecipieStore;
  mealStore: MealStore;
  extraStore: ExtraStore;
  shoppingStore: ShoppingItemStore;
  settingStore: SettingsStore;
}

interface DBContextProps {
  db?: DB;
  dbName: string;
  stores?: Stores;
}

export const DBContext = createContext<DBContextProps>({dbName: "unknown"});

interface DBProviderProps {
  children: React.ReactNode;
  database: Promise<DB>;
  dbName: string;
}

export function DBProvider({ children, database, dbName }: DBProviderProps) {
  const { setError } = useContext(AlertContext);

  const [db, setDB] = useState<DB | undefined>();
  const [stores, setStores] = useState<Stores | undefined>();

  useEffect(() => {
    database.then((db: DB) => {
      setDB(db);
      setStores({
        unitStore: db.units(),
        categoryStore: db.categories(),
        ingredientStore: db.ingredients(),
        readymealStore: db.readymeals(),
        recipieStore: db.recipies(),
        mealStore: db.meals(),
        extraStore: db.extra(),
        shoppingStore: db.shopping(),
        settingStore: db.settings(),
      })
    }).catch((error: Error) => {
      setError(error.message);
      console.error("Error creating database", error);
    });
  }, [database])

  return (
    <DBContext.Provider value={{ db, dbName, stores }}>
      {children}
    </DBContext.Provider>
  );
}
