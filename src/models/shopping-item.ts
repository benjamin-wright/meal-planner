import { UnitType } from "./units";

export type ShoppingItem = {
  id: number;
  name: string;
  category: number;
  unitType: UnitType;
  unit?: number;
  quantity: number;
  got: boolean;
}
