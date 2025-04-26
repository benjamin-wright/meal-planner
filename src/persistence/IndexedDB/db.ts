import { Units, unitsV1 } from "./units";
import { Categories, categoriesV1 } from "./categories";
import { Ingredients, ingredientsV1 } from "./ingredients";
import { Recipies, recipiesV1 } from "./recipies";
import { Meals, mealsV1 } from "./meals";
import { Extras, extraV1 } from "./extras";
import { Settings, settingsV1 } from "./settings";
import { TypedDB } from "./typed-db";
import { DB } from "../interfaces/db";
import { ShoppingItems, shoppingItemsV1 } from "./shopping-item";

const DB_VERSION = 1;

const migrations = [
  (db: IDBDatabase) => {
    unitsV1(db);
    categoriesV1(db);
    ingredientsV1(db);
    recipiesV1(db);
    mealsV1(db);
    extraV1(db);
    shoppingItemsV1(db);
    settingsV1(db);
  },
]

interface ICreateProps {
  dbName: string;
  reset?: boolean;
  initFunc?: (db: IndexedDB) => Promise<void>;
}

export class IndexedDB implements DB {
  private static async reset(dbName: string) {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName);
      request.onsuccess = () => {
        console.info(`Database ${dbName} deleted successfully`);
        resolve();
      };

      request.onerror = (event: Event) => {
        if (!event.target) {
          return reject(new Error("Unknown error deleting database"));
        }

        const request = event.target as IDBOpenDBRequest;
        if (!request.error) {
          return reject(new Error("Unknown error deleting database"));
        }

        return reject(new Error(`Error deleting database: ${request.error}`));
      };

      request.onblocked = () => {
        reject(new Error("Database deletion blocked"));
      };
    });
  }

  static async create({ dbName, reset, initFunc }: ICreateProps): Promise<IndexedDB> {
    let isNew = false;

    if (reset) {
      console.info(`Resetting database ${dbName}`);
      await IndexedDB.reset(dbName);
    }

    return new Promise<IndexedDB>((resolve, reject) => {
      const request = indexedDB.open(dbName, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (event.oldVersion === 0) {
          isNew = true;
        }

        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion ? event.newVersion : 0;

        for (let v = oldVersion; v < newVersion; v++) {
          console.info(`Migrating to version ${v + 1}`);
          migrations[v](db);
        }
      };

      request.onsuccess = () => {
        const db = new IndexedDB(request.result);
        if (isNew && initFunc) {
          return initFunc(db).then(() => resolve(db)).catch(reject);
        } else {
          resolve(db);
        }
      };

      request.onerror = (event: Event) => {
        if (!event.target) {
          return reject(new Error("Unknown error opening database"));
        }

        const request = event.target as IDBOpenDBRequest;
        if (!request.error) {
          return reject(new Error("Unknown error opening database"));
        }

        return reject(new Error(`Error opening database: ${request.error}`));
      };
    });
  }

  private db: TypedDB;

  private constructor(db: IDBDatabase) {
    this.db = new TypedDB(db);
  }

  units() {
    return new Units(this.db);
  }

  categories() {
    return new Categories(this.db);
  }

  ingredients() {
    return new Ingredients(this.db);
  }

  recipies() {
    return new Recipies(this.db);
  }

  meals() {
    return new Meals(this.db);
  }

  extra() {
    return new Extras(this.db);
  }

  shopping() {
    return new ShoppingItems(this.db);
  }
  
  settings() {
    return new Settings(this.db);
  }
}
