import { unitsV1 } from "./units";
import { categoriesV1 } from "./categories";
import { ingredientsV1 } from "./ingredients";
import { recipiesV1 } from "./recipies";

const DB_NAME = "meal-planner";
const DB_VERSION = 2;

const migrations = [
  (db: IDBDatabase) => {
    unitsV1(db);
    categoriesV1(db);
    ingredientsV1(db);
  },
  (db: IDBDatabase) => {
    recipiesV1(db);
  },
]

export async function createDB(): Promise<DB> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      let oldVersion = event.oldVersion;
      let newVersion = event.newVersion ? event.newVersion : 0;

      for (let v = oldVersion; v < newVersion; v++) {
        console.info(`Migrating to version ${v+1}`);
        migrations[v](db);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (error) => {
      reject(error);
    };
  }).then((db: IDBDatabase) => new DB(db));
}

export class DB {
  private db: IDBDatabase;
  
  constructor(db: IDBDatabase) {
    this.db = db;
  }
  
  async get<T>(db: string, id: number): Promise<T> {
    const tx = this.db.transaction(db, "readonly");
    const store = tx.objectStore(db);
    const req = store.get(id);
    tx.commit();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async getAll<T>(db: string): Promise<T[]> {
    const tx = this.db.transaction(db, "readonly");
    const store = tx.objectStore(db);
    const req = store.getAll();
    tx.commit();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async getByIndex<T, K extends keyof T>(
    db: string,
    key: K,
    value: T[K] & IDBValidKey
  ): Promise<T[]> {
    const tx = this.db.transaction(db, "readonly");
    const store = tx.objectStore(db);
    const index = store.index(key as string);
    const req = index.getAll(value);
    tx.commit();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async add<T>(db: string, value: T & { id?: number }): Promise<number> {
    const tx = this.db.transaction(db, "readwrite");
    const store = tx.objectStore(db);
    delete value.id;
    const req = store.add(value);
    tx.commit();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result as number);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async put<T>(db: string, value: T): Promise<void> {
    const tx = this.db.transaction(db, "readwrite");
    const store = tx.objectStore(db);
    store.put(value);
    tx.commit();
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = () => {
        reject(tx.error);
      };
    });
  }

  async delete(db: string, id: number): Promise<void> {
    const tx = this.db.transaction(db, "readwrite");
    const store = tx.objectStore(db);
    store.delete(id);
    tx.commit();
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = () => {
        reject(tx.error);
      };
    });
  }

  async clear(db: string): Promise<void> {
    const tx = this.db.transaction(db, "readwrite");
    const store = tx.objectStore(db);
    store.clear();
    tx.commit();
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = () => {
        reject(tx.error);
      };
    });
  }

  reset() {
    this.db.close();
    indexedDB.deleteDatabase(DB_NAME);
  }
}