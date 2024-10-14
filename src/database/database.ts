import { IDatabaseTransport } from "./types";
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
  Migration,
  migrationSchema,
} from "./schemas";

export type IMigration = (db: Database) => Promise<void>;

export type DatabaseOptions = {
  transport: IDatabaseTransport;
};

export class Database {
  private transport: IDatabaseTransport;

  constructor(transport: IDatabaseTransport) {
    this.transport = transport;

    this.transport.init({
      name: "meal-planner",
      version: 1,
      stores: {
        planner: plannerSchema,
        recipies: recipieSchema,
        ingredients: ingredientSchema,
        categories: categorySchema,
        units: unitSchema,
        migrations: migrationSchema,
      },
    });
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

  get migrations() {
    return this.transport.store<Migration>("migrations");
  }
}
