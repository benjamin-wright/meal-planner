import { createContext, useContext, useEffect, useState } from "react";
import { DB } from "../../persistence/interfaces/db";
import { UnitStore } from "../../persistence/interfaces/units";
import { CategoryStore } from "../../persistence/interfaces/categories";
import { IngredientStore } from "../../persistence/interfaces/ingredients";
import { RecipieStore } from "../../persistence/interfaces/recipies";
import { MealStore } from "../../persistence/interfaces/meals";
import { ExtraStore } from "../../persistence/interfaces/extras";
import { SettingsStore } from "../../persistence/interfaces/settings";
import { AlertContext } from "./alerts";

interface DBContextProps {
  db?: DB;
  dbName: string;
  unitStore?: UnitStore;
  categoryStore?: CategoryStore;
  ingredientStore?: IngredientStore;
  recipieStore?: RecipieStore;
  mealStore?: MealStore;
  extraStore?: ExtraStore;
  settingStore?: SettingsStore;
}

export const DBContext = createContext<DBContextProps>({dbName: "unknown"});

interface DBProviderProps {
  children: React.ReactNode;
  database: Promise<DB>;
  dbName: string;
}

export function DBProvider({ children, database, dbName }: DBProviderProps) {
  const { setError } = useContext(AlertContext);

  const [db, setDB] = useState<DB | undefined>(undefined);
  const [unitStore, setUnits] = useState<UnitStore | undefined>(undefined);
  const [categoryStore, setCategories] = useState<CategoryStore | undefined>(undefined);
  const [ingredientStore, setIngredients] = useState<IngredientStore | undefined>(undefined);
  const [recipieStore, setRecipies] = useState<RecipieStore | undefined>(undefined);
  const [mealStore, setMeals] = useState<MealStore | undefined>(undefined);
  const [extraStore, setExtra] = useState<ExtraStore | undefined>(undefined);
  const [settingStore, setSettings] = useState<SettingsStore | undefined>(undefined);

  useEffect(() => {
    database.then((db: DB) => {
      setDB(db);
      setUnits(db.units());
      setCategories(db.categories());
      setIngredients(db.ingredients());
      setRecipies(db.recipies());
      setMeals(db.meals());
      setExtra(db.extra());
      setSettings(db.settings());
    }).catch((error: Error) => {
      setError(error.message);
      console.error("Error creating database", error);
    });
  }, [database])

  return (
    <DBContext.Provider
      value={{ db, dbName, unitStore, categoryStore, ingredientStore, recipieStore, mealStore, extraStore, settingStore }}
    >
      {children}
    </DBContext.Provider>
  );
}
