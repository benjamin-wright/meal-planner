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
      },
      finalize: async (transport: IDatabaseTransport, m: IMigrations) => {
        for (const [index, migration] of migrations.entries()) {
          if (await m.exists(index)) {
            console.info(`Skipping migration ${index}: already exists`);
            return;
          }

          console.info(`Running migration ${index}`);
          await migration(transport);
          await m.add(index);
        }
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
}
