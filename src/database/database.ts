import { IDatabaseTransport } from "./transport";

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

  async migrate(id: number, migration: IMigration): Promise<void> {
    const existing = await this.migrations.get(id);
    if (existing) {
      console.info(`Skipping migration ${id}: already done`);
      return;
    }

    await migration(this);
    await this.migrations.add({ id });
  }
}

export type Planner = {
  id?: number;
  name: string;
  date: Date;
};

const plannerSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    date: { keyPath: "date" },
  },
};

export type Recipie = {
  id?: number;
  name: string;
};

const recipieSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    category: { keyPath: "category" },
  },
};

export type Ingredient = {
  id?: number;
  name: string;
  category: number;
};

const ingredientSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
    category: { keyPath: "category" },
  },
};

export type Category = {
  id?: number;
  name: string;
};

const categorySchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};

export type Unit = {
  id?: number;
  name: string;
};

const unitSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};

export type Migration = {
  id: number;
}

const migrationSchema = {
  options: { keyPath: "id" },
}