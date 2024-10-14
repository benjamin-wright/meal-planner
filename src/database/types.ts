export type DatabaseSchema = {
  name: string;
  version: number;
  stores: {
    [name: string]: {
      options: IDBObjectStoreParameters;
      indexes?: {
        [name: string]: {
          keyPath: string;
          options?: IDBIndexParameters;
        };
      };
    };
  };
  migrations?: ((db: IDBDatabase) => void)[];
};

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
