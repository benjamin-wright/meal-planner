import { IDatabaseTransport } from "./transport";

export type DatabaseOptions = {
    transport: IDatabaseTransport;  
};

export default class Database {
    private transport: IDatabaseTransport;

    constructor(transport: IDatabaseTransport) {
        this.transport = transport;

        let objectStore: IDBObjectStore;

        this.transport.init({
            name: "meal-planner",
            version: 1,
            stores: {
                "planner": {
                    options: { keyPath: "id", autoIncrement: true },
                    indexes: {
                        "name": { keyPath: "name", options: { unique: true } },
                        "date": { keyPath: "date" },
                    },
                },
                "recipies": {
                    options: { keyPath: "id", autoIncrement: true },
                    indexes: {
                        "name": { keyPath: "name", options: { unique: true }},
                        "category": { keyPath: "category" },
                    },
                },
                "ingredients": {
                    options: { keyPath: "id", autoIncrement: true },
                    indexes: {
                        "name": { keyPath: "name", options: { unique: true }},
                        "category": { keyPath: "category" },
                    },
                },
                "categories": {
                    options: { keyPath: "id", autoIncrement: true },
                    indexes: {
                        "name": { keyPath: "name", options: { unique: true }},
                    },
                },
                "units": {
                    options: { keyPath: "id", autoIncrement: true },
                    indexes: {
                        "name": { keyPath: "name", options: { unique: true }},
                    },
                },
            },
        })
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
}

export type Recipie = {
    id: number;
    name: string;
}

export type Ingredient = {
    id: number;
    name: string;
    category: number;
}

export type Category = {
    id: number;
    name: string;
}

export type Unit = {
    id: number;
    name: string;
}