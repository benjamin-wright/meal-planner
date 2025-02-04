import { PlanItem } from "../../models/plan-item";

export interface PlanItemStore {
  get(id: number): Promise<PlanItem>;
  getAll(): Promise<PlanItem[]>;
  add(name: string, order: number): Promise<number>;
  put(value: PlanItem): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
