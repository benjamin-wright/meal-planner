import { useState } from "react";
import { pickMagnitude, Unit } from "../../../../../models/units";
import { AddButton } from "../../../../components/inputs/add-button/add-button";
import { NumericInput } from "../../../../components/inputs/numeric-input/numeric-input";
import { Popup } from "../../../../components/containers/popup/popup";

import "./quantity-select.css";

type UnitMagnitudeOption = {
  unit: Unit;
  magnitudeIndex: number;
};

type Props = {
  title: string;
  isOpen: boolean;
  quantity: number;
  unitId: number;
  units: Unit[];
  onNewUnit: () => void;
  onChange: (result?: { quantity: number; unitId: number }) => void;
};

function magnitudeLabel(option: UnitMagnitudeOption): string {
  const magnitude = option.unit.magnitudes[option.magnitudeIndex];
  const suffix = magnitude.abbrev || magnitude.singular || magnitude.plural;
  return suffix ? `${option.unit.name} – ${suffix}` : option.unit.name;
}

export function QuantitySelect({ isOpen, ...rest }: Props) {
  if (!isOpen) return null;
  return <QuantitySelectContent {...rest} />;
}

function QuantitySelectContent({ title, quantity, unitId, units, onNewUnit, onChange }: Omit<Props, 'isOpen'>) {
  const unit = units.find(u => u.id === unitId) ?? units[0];
  const effectiveQty = quantity > 0 ? quantity : (unit && unit.magnitudes.length > 0 ? unit.base * unit.magnitudes[0].multiplier : 1);
  const initialMagnitude = unit ? pickMagnitude(unit, effectiveQty) : undefined;
  const initialMagnitudeIndex = unit && initialMagnitude ? unit.magnitudes.indexOf(initialMagnitude) : 0;
  const initialDisplay = unit && initialMagnitude ? (quantity > 0 ? effectiveQty / (unit.base * initialMagnitude.multiplier) : 1) : 1;

  const [displayValue, setDisplayValue] = useState(initialDisplay);
  const [selectedUnitId, setSelectedUnitId] = useState(unit?.id ?? unitId);
  const [selectedMagnitudeIndex, setSelectedMagnitudeIndex] = useState(initialMagnitudeIndex >= 0 ? initialMagnitudeIndex : 0);

  const options: UnitMagnitudeOption[] = units.flatMap(unit =>
    unit.magnitudes.map((_, magnitudeIndex) => ({ unit, magnitudeIndex }))
  );

  function handleClose(accepted: boolean) {
    if (accepted) {
      const selectedUnit = units.find(u => u.id === selectedUnitId);
      const magnitude = selectedUnit?.magnitudes[selectedMagnitudeIndex];
      if (selectedUnit && magnitude) {
        onChange({ quantity: displayValue * selectedUnit.base * magnitude.multiplier, unitId: selectedUnit.id });
        return;
      }
    }
    onChange();
  }

  return (
    <Popup title={title} isOpen={true} onClose={handleClose}>
      <div className="quantity-select__content">
        <NumericInput
          id="quantity-value-input"
          label="Quantity"
          value={displayValue}
          onChange={setDisplayValue}
        />
        <ul className="quantity-select__list">
          {options.map((option, index) => (
            <li key={index}>
              <input
                id={`quantity-option-${index}`}
                type="checkbox"
                checked={option.unit.id === selectedUnitId && option.magnitudeIndex === selectedMagnitudeIndex}
                onChange={() => {
                  setSelectedUnitId(option.unit.id);
                  setSelectedMagnitudeIndex(option.magnitudeIndex);
                }}
              />
              <label htmlFor={`quantity-option-${index}`}>{magnitudeLabel(option)}</label>
            </li>
          ))}
        </ul>
        <AddButton id="add-unit-button" onClick={onNewUnit} />
      </div>
    </Popup>
  );
}
