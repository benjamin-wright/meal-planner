import {
  DatabaseSchema,
  DatabaseStoreIndexes,
  IDatabaseStore,
  IDatabaseTransport,
} from "../types";
import { IndexedDBStore } from "./store";

export class IndexedDBDatabase implements IDatabaseTransport {
  private name: string;
  private factory: IDBFactory;
  private db: Promise<IDBDatabase>;

  constructor(factory: IDBFactory) {
    this.factory = factory;
    this.db = Promise.reject(new Error("Database not initialized"));
    this.name = "default";
  }

  init(schema: DatabaseSchema): void {
    this.name = schema.name;
    this.db.catch(() => {});
    this.db = new Promise<IDBDatabase>((resolve, reject) => {
      const req = this.factory.open(schema.name, schema.version);

      req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        this.initMigrationsStore(db);

        for (const [name, { options, indexes }] of Object.entries(
          schema.stores
        )) {
          if (!db.objectStoreNames.contains(name)) {
            this.createStore(db, name, options, indexes);
          } else {
            this.updateStore(db, name, options, indexes);
          }
        }
      };

      req.onsuccess = () => {
        resolve(req.result);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });

    this.db.then((db: IDBDatabase) => {
      if (schema.finalize) {
        return schema
          .finalize(this, {
            exists: async (index) => {
              return new Promise((resolve, reject) => {
                const tx = db.transaction("migrations");
                const req = tx.objectStore("migrations").get(index);
                tx.commit();

                req.onsuccess = () => {
                  resolve(!!req.result);
                };

                req.onerror = () => {
                  reject(req.error);
                };
              });
            },
            add: async (index) => {
              return new Promise((resolve, reject) => {
                const tx = db.transaction("migrations", "readwrite");
                const req = tx.objectStore("migrations").add({ id: index });
                tx.commit();

                req.onsuccess = () => {
                  resolve();
                };

                req.onerror = () => {
                  reject(req.error);
                };
              });
            },
            remove: async (index) => {
              return new Promise((resolve, reject) => {
                const tx = db.transaction("migrations", "readwrite");
                const req = tx.objectStore("migrations").delete(index);
                tx.commit();

                req.onsuccess = () => {
                  resolve();
                };

                req.onerror = () => {
                  reject(req.error);
                };
              });
            },
          })
          .then(() => db);
      }

      return db;
    });
  }

  private initMigrationsStore(db: IDBDatabase): void {
    if (!db.objectStoreNames.contains("migrations")) {
      db.createObjectStore("migrations", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  }

  private createStore(
    db: IDBDatabase,
    name: string,
    options: IDBObjectStoreParameters,
    indexes?: DatabaseStoreIndexes
  ): void {
    const store = db.createObjectStore(name, options);
    if (indexes) {
      for (const [indexName, { keyPath, options }] of Object.entries(indexes)) {
        store.createIndex(indexName, keyPath, options);
      }
    }
  }

  private updateStore(
    db: IDBDatabase,
    name: string,
    options: IDBObjectStoreParameters,
    indexes?: DatabaseStoreIndexes
  ): void {
    const tx = db.transaction(name, "readwrite");
    const store = tx.objectStore(name);

    if (
      store.autoIncrement !== options.autoIncrement ||
      store.keyPath !== options.keyPath
    ) {
      throw new Error(
        "Cannot change keyPath or autoIncrement property of existing object store"
      );
    }

    if (indexes) {
      for (const [indexName, { keyPath, options }] of Object.entries(indexes)) {
        if (store.indexNames.contains(indexName)) {
          store.deleteIndex(indexName);
        }

        store.createIndex(indexName, keyPath, options);
      }
    }

    tx.commit();
  }

  store<T>(name: string): IDatabaseStore<T> {
    return new IndexedDBStore<T>(this.db, name);
  }

  clear(): Promise<void> {
    const oldDb = this.db;
    this.db = Promise.reject(new Error("Database not initialized"));
    return oldDb
      .catch((err) => {
        console.error("Clearing database in error state: ", err);
      })
      .then((db) => {
        if (db) {
          db.close();
        }

        return new Promise((resolve, reject) => {
          const req = this.factory.deleteDatabase(this.name);

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };

          req.onblocked = () => {
            reject(
              new Error(
                "Database deletion blocked, check that the app isn't open in another tab!"
              )
            );
          };
        });
      });
  }
}
