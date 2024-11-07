import { IDatabaseTransport, IMigrations } from "./types";
import {
  Planner,
  plannerSchema,
  Recipie,
  recipieSchema,
  Ingredient,
  ingredientSchema,
  Category,
  categorySchema,
  Unit,
  unitSchema,
} from "./schemas";
import { migrations } from "./migrations";

export type DatabaseOptions = {
  transport: IDatabaseTransport;
};

const schema = {
  name: "meal-planner",
  version: 1,
  stores: {
    planner: plannerSchema,
    recipies: recipieSchema,
    ingredients: ingredientSchema,
    categories: categorySchema,
    units: unitSchema,
  },
  finalize: async (transport: IDatabaseTransport, m: IMigrations) => {
    for (let i = 0; i < migrations.length; i++) {
      if (await m.exists(i)) {
        console.info(`Skipping migration ${i}: already exists`);
      } else {
        await migrations[i](transport);
        await m.add(i);
      }
    }
  },
};

export class Database {
  private transport: IDatabaseTransport;

  constructor(transport: IDatabaseTransport) {
    this.transport = transport;
    this.transport.init(schema);
  }

  get planner() {
    return this.transport.store<Planner>("planner");
  }

  get recipies() {
    return this.transport.store<Recipie>("recipies");
  }

  get ingredients() {
    return this.transport.store<Ingredient>("ingredients");
  }

  get categories() {
    return this.transport.store<Category>("categories");
  }

  get units() {
    return this.transport.store<Unit>("units");
  }

  async reset() {
    console.info("Resetting database");
    await this.transport.clear();
    this.transport.init(schema);
  }
}
