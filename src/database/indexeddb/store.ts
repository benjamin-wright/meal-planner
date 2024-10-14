import { IDatabaseStore } from "../types";

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
