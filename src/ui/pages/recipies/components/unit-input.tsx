import { Unit } from "../../../../models/units";

interface UnitInputProps {
  id: string;
  label: string;
  unit: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function UnitInput({}: UnitInputProps) {
  switch
}