import {
  DatabaseSchema,
  DatabaseStoreIndexes,
  IDatabaseStore,
  IDatabaseTransport,
} from "../types";
import { IndexedDBStore } from "./store";

export class IndexedDBDatabase implements IDatabaseTransport {
  private factory: IDBFactory;
  private db: Promise<IDBDatabase>;

  constructor(factory: IDBFactory) {
    this.factory = factory;
    this.db = Promise.reject(new Error("Database not initialized"));
  }

  init(schema: DatabaseSchema): void {
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
    }).then((db: IDBDatabase) => {
      if (schema.finalize) {
        return schema
          .finalize(this, {
            exists: async (index) => {
              return new Promise((resolve, reject) => {
                const req = db
                  .transaction("migrations")
                  .objectStore("migrations")
                  .get(index);

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
                const req = db
                  .transaction("migrations", "readwrite")
                  .objectStore("migrations")
                  .add({ id: index });

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
                const req = db
                  .transaction("migrations", "readwrite")
                  .objectStore("migrations")
                  .delete(index);

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
}
