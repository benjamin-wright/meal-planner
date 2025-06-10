import { Ingredient } from "../../models/ingredients";
import { IngredientStore } from "../interfaces/ingredients";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "ingredients";

export function ingredientsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
  store.createIndex("category", "category");
  store.createIndex("edible", "edible");
  store.createIndex("edible_readymeal", ["edible", "readymeal"]);
}

type IndexedIngredient = {
  id: number;
  name: string;
  category: number;
  edible: number;
  readymeal: number;
}

function toIngredient(data: IndexedIngredient): Ingredient {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    edible: data.edible === 1,
    readymeal: data.readymeal === 1,
  };
}

export class Ingredients implements IngredientStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Ingredient> {
    const data = await this.db.get<IndexedIngredient>(TABLE_NAME, id);
    return toIngredient(data);
  }

  async getAll(): Promise<Ingredient[]> {
    const data = await this.db.getAll<IndexedIngredient>(TABLE_NAME);
    return data.map(toIngredient);
  }

  async getEdible(): Promise<Ingredient[]> {
    const data = await this.db.getByIndex<IndexedIngredient>(TABLE_NAME, "edible_readymeal", [1, 0]);
    return data.map(toIngredient);
  }

  async getInedible(): Promise<Ingredient[]> {
    const data = await this.db.getByIndex<IndexedIngredient>(TABLE_NAME, "edible", 0);
    return data.map(toIngredient);
  }

  async getReadyMeals(): Promise<Ingredient[]> {
    const data = await this.db.getByIndex<IndexedIngredient>(TABLE_NAME, "edible_readymeal", [1, 1]);
    return data.map(toIngredient);
  }

  async add(name: string, category: number, edible: boolean, readymeal: boolean): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, edible: edible ? 1 : 0, readymeal: readymeal ? 1 : 0 });
  }

  async put(value: Ingredient): Promise<void> {
    return this.db.put(TABLE_NAME, {
      id: value.id,
      name: value.name,
      category: value.category,
      edible: value.edible ? 1 : 0,
      readymeal: value.readymeal ? 1 : 0,
    });
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
