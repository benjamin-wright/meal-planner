export type Migration = {
  id: number;
}

export const migrationSchema = {
  options: { keyPath: "id" },
}