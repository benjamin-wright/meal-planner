import { createContext, useContext, useEffect, useState } from "react";
import { DB } from "../../persistence/interfaces/db";
import { UnitStore } from "../../persistence/interfaces/units";
import { CategoryStore } from "../../persistence/interfaces/categories";
import { ItemStore } from "../../persistence/interfaces/item";
import { RecipieStore } from "../../persistence/interfaces/recipies";
import { MealStore } from "../../persistence/interfaces/meals";
import { ExtraStore } from "../../persistence/interfaces/extras";
import { ShoppingItemStore } from "../../persistence/interfaces/shopping-item";
import { AlertContext } from "./alerts";

type Stores = {
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

interface DBProviderProps {
  children: React.ReactNode;
  database: Promise<DB>;
  dbName: string;
}

export function DBProvider({ children, database, dbName }: DBProviderProps) {
  const { alert } = useContext(AlertContext);

  const [db, setDB] = useState<DB | undefined>();
  const [stores, setStores] = useState<Stores | undefined>();

  useEffect(() => {
    database.then((db: DB) => {
      setDB(db);
      setStores({
        unitStore: db.units(),
        categoryStore: db.categories(),
        itemStore: db.items(),
        recipieStore: db.recipies(),
        mealStore: db.meals(),
        extraStore: db.extra(),
        shoppingStore: db.shopping(),
      })
    }).catch((error: Error) => {
      alert({
        message: error.message,
        severity: "error"
      });
      console.error("Error creating database", error);
    });
  }, [database, alert])

  return (
    <DBContext.Provider value={{ db, dbName, stores }}>
      {children}
    </DBContext.Provider>
  );
}
