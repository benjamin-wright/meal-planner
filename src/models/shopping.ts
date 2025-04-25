import { UnitType } from "./units";

export type Shopping = {
  id: number;
  name: string;
  category: number;
  unitType: UnitType;
  quantity: number;
  got: boolean;
}
