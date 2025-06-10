export class TypedDB {
  private db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  async get<T>(table: string, id: number): Promise<T> {
    const tx = this.db.transaction(table, "readonly");
    const store = tx.objectStore(table);
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

  async getAll<T>(table: string): Promise<T[]> {
    const tx = this.db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    const req = store.getAll();
    tx.commit();
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result as T[]);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async getByIndex<T>(
    table: string,
    indexName: string,
    value: IDBValidKey | IDBValidKey[]
  ): Promise<T[]> {
    const tx = this.db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    const index = store.index(indexName);
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

  async add<T>(table: string, value: T & { id?: number }): Promise<number> {
    const tx = this.db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
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

  async put<T>(table: string, value: T): Promise<void> {
    const tx = this.db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
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

  async delete(table: string, id: number): Promise<void> {
    const tx = this.db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
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

  async clear(table: string): Promise<void> {
    const tx = this.db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
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

  reset(db: string): Promise<void> {
    this.db.close();
    const request = indexedDB.deleteDatabase(db);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
      request.onblocked = () => {
        reject(new Error("Database deletion blocked"));
      };
    });
  }
}
