import { useContext, useEffect, useState } from "react";
import { DB } from "../../../persistence/interfaces/db";
import { AlertContext } from "../alerts";
import { DBContext, Stores } from "./db-context";

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
