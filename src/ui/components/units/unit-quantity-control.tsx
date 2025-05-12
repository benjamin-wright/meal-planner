import { Box } from "@mui/material";
import { Unit, UnitType } from "../../../models/units";
import { SelectID } from "../select-id";
import { SelectObject } from "../select-object";
import { useEffect, useState } from "react";
import { CollectiveInput } from "./collective-input";
import { MagnitudeInput } from "./magnitude-input";

interface UnitQuantityControlProps {
  unitId: number;
  quantity: number;
  units: Unit[];
  onChange: (unitId: number, quantity: number) => void;
  onNewUnit: () => void;
}

export function UnitQuantityControl({ unitId, quantity, units, onChange, onNewUnit }: UnitQuantityControlProps) {
  const [unitType, setUnitType] = useState<UnitType>(UnitType.Count);
  const [unit, setUnit] = useState<Unit>(units.find(u => u.id === unitId) ?? units[0]);

  function handleUnitTypeChange(type: UnitType) {
    setUnitType(type);

    const newUnit = units.find(u => u.type === type);
    if (!newUnit) {
      return;
    }

    setUnit(newUnit);
    onChange(
      newUnit.id,
      unit.base !== newUnit.base ? newUnit.base ?? 1 : quantity
    );
  }

  function handleUnitChange(id: number) {
    const newUnit = units.find(u => u.id === id);
    if (!newUnit) {
      return;
    }

    setUnit(newUnit);
    onChange(
      newUnit.id,
      unit.base !== newUnit.base ? newUnit.base ?? 1 : quantity
    );
  }

  useEffect(() => {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      setUnit(unit);
      setUnitType(unit.type);
    }
  }, [unitId])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", justifyContent: "space-between" }}>
        <SelectObject
          id="unit-type"
          label="unit type"
          items={[UnitType.Count, UnitType.Weight, UnitType.Volume]}
          value={unitType}
          toLabel={t => t.toString()}
          onChange={handleUnitTypeChange}
          sx={{ flexGrow: 1 }}
        />

        <SelectID
          id="unit"
          label="unit"
          link={`/units/new?type=${unitType}`}
          toLabel={u => u.name}
          items={units.filter(u => u.type === unitType)}
          value={unitId}
          required
          onChange={handleUnitChange}
          onNav={onNewUnit}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      {unit && unit.type === UnitType.Count && (
        <CollectiveInput
          id="quantity"
          label="quantity"
          value={quantity}
          unit={unit}
          onChange={value => onChange(unitId, value)}
        />
      )}
      {unit && unit.type !== UnitType.Count && (
        <MagnitudeInput
          id="quantity"
          label="quantity"
          value={quantity}
          unit={unit}
          onChange={value => onChange(unitId, value)}
        />
      )}
    </Box>
  );
}