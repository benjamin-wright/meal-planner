import { Units, unitsV1 } from "./units";
import { Categories, categoriesV1 } from "./categories";
import { Ingredients, ingredientsV1 } from "./ingredients";
import { Recipies, recipiesV1 } from "./recipies";
import { Meals, mealsV1 } from "./meals";
import { Misc, miscV1 } from "./misc";
import { TypedDB } from "./typed-db";
import { DB } from "../interfaces/db";

const DB_VERSION = 4;

const migrations = [
  (db: IDBDatabase) => {
    unitsV1(db);
    categoriesV1(db);
    ingredientsV1(db);
  },
  (db: IDBDatabase) => {
    recipiesV1(db);
  },
  (db: IDBDatabase) => {
    mealsV1(db);
  },
  (db: IDBDatabase) => {
    miscV1(db);
  },
]

interface ICreateProps {
  dbName: string;
  initFunc?: (db: IndexedDB) => Promise<void>;
}

export class IndexedDB implements DB {
  static async create({ dbName, initFunc }: ICreateProps): Promise<IndexedDB> {
    let isNew = false;

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
        const db = new IndexedDB(request.result, dbName);
        if (isNew && initFunc) {
          return initFunc(db).then(() => resolve(db)).catch(reject);
        } else {
          resolve(db);
        }
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  private db: TypedDB;
  private name: string;

  private constructor(db: IDBDatabase, name: string) {
    this.db = new TypedDB(db);
    this.name = name;
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

  misc() {
    return new Misc(this.db);
  }

  async reset() {
    await this.db.reset(this.name);
  }
}
