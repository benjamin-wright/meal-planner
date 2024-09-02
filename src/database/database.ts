import { IDatabaseTransport } from "./transport";

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
    });
  }

  Planner() {
    return this.transport.store<Planner>("planner");
  }

  Recipies() {
    return this.transport.store<Recipie>("recipies");
  }

  Ingredients() {
    return this.transport.store<Ingredient>("ingredients");
  }

  Categories() {
    return this.transport.store<Category>("categories");
  }

  Units() {
    return this.transport.store<Unit>("units");
  }
}

export type Planner = {
  id: number;
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
  id: number;
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
  id: number;
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
  id: number;
  name: string;
};

const categorySchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};

export type Unit = {
  id: number;
  name: string;
};

const unitSchema = {
  options: { keyPath: "id", autoIncrement: true },
  indexes: {
    name: { keyPath: "name", options: { unique: true } },
  },
};
