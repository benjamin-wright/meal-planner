import { DatabaseSchema, IDatabaseStore, IDatabaseTransport } from "../types";
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
    this.db = new Promise((resolve, reject) => {
      const req = this.factory.open(schema.name, schema.version);

      req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        for (const [name, { options, indexes }] of Object.entries(
          schema.stores
        )) {
          const store = db.createObjectStore(name, options);

          if (indexes) {
            for (const [indexName, { keyPath, options }] of Object.entries(
              indexes
            )) {
              store.createIndex(indexName, keyPath, options);
            }
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
  }

  store<T>(name: string): IDatabaseStore<T> {
    return new IndexedDBStore<T>(this.db, name);
  }
}
