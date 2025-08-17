import { Unit } from "../../../../../models/units";
import "./unit-list-item.css";

type Props = {
  unit: Unit
}

export function UnitListItem({ unit }: Props) {
  return <li className="unit-list-item">{unit.name}</li>;
}