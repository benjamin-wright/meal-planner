export type DatabaseSchema = {
  name: string;
  version: number;
  stores: {
    [name: string]: {
      options: IDBObjectStoreParameters;
      indexes?: DatabaseStoreIndexes;
    };
  };
};

export type DatabaseStoreIndexes = {
  [name: string]: {
    keyPath: string;
    options?: IDBIndexParameters;
  };
}

export interface IDatabaseTransport {
  init(schema: DatabaseSchema): void;
  store<T>(name: string): IDatabaseStore<T>;
}

export interface IDatabaseStore<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  getIndex<K extends keyof T>(key: K, value: T[K] & IDBValidKey): Promise<T[]>;
  put(id: number, value: T): Promise<void>;
  delete(id: number): Promise<void>;
  add(value: T): Promise<number>;
}

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
  }
  
  private createStore(db: IDBDatabase, name: string, options: IDBObjectStoreParameters, indexes?: DatabaseStoreIndexes): void {
    let store = db.createObjectStore(name, options);
    if (indexes) {
      for (const [indexName, { keyPath, options }] of Object.entries(
        indexes
      )) {
        store.createIndex(indexName, keyPath, options);
      }
    }
  }

  private updateStore(db: IDBDatabase, name: string, options: IDBObjectStoreParameters, indexes?: DatabaseStoreIndexes): void {
    let tx = db.transaction(name, "readwrite");
    let store = tx.objectStore(name);

    if (store.autoIncrement !== options.autoIncrement || store.keyPath !== options.keyPath) {
      throw new Error("Cannot change keyPath or autoIncrement property of existing object store");
    }

    if (indexes) {
      for (const [indexName, { keyPath, options }] of Object.entries(
        indexes
      )) {
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

export class IndexedDBStore<T> implements IDatabaseStore<T> {
  private db: Promise<IDBDatabase>;
  private name: string;

  constructor(db: Promise<IDBDatabase>, name: string) {
    this.db = db;
    this.name = name;
  }

  async get(id: number): Promise<T> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readonly");
    const store = tx.objectStore(this.name);
    const req = store.get(id);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async getAll(): Promise<T[]> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readonly");
    const store = tx.objectStore(this.name);
    const req = store.getAll();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async getIndex<K extends keyof T>(
    key: K,
    value: T[K] & IDBValidKey
  ): Promise<T[]> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readonly");
    const store = tx.objectStore(this.name);
    const index = store.index(key as string);
    const req = index.getAll(value);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async add(value: T): Promise<number> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readwrite");
    const store = tx.objectStore(this.name);
    const req = store.add(value);
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result as number);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async put(id: number, value: T): Promise<void> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readwrite");
    const store = tx.objectStore(this.name);
    store.put(value, id);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = () => {
        reject(tx.error);
      };
    });
  }

  async delete(id: number): Promise<void> {
    const db = await this.db;
    const tx = db.transaction(this.name, "readwrite");
    const store = tx.objectStore(this.name);
    store.delete(id);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = () => {
        reject(tx.error);
      };
    });
  }
}
