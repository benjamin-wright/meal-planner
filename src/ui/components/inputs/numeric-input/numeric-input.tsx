import { useEffect, useState } from "react";
import { Fieldset } from "../fieldset/fieldset"
import "./numeric-input.css"

type Props = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function NumericInput({ id, label, value, onChange }: Props) {
  const rounded = Math.round(value * 1000) / 1000;
  const [innerValue, setInnerValue] = useState(rounded.toString());

  useEffect(() => {
    setInnerValue(rounded.toString());
  }, [rounded]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    const parts = newValue.split(".");
    if (parts.length > 2) {
      return;
    }
    if (parts.length === 2 && parts[1].length > 3) {
      return;
    }

    setInnerValue(newValue);
  }

  function handleBlur() {
    const parsed = parseFloat(innerValue);
    if (isNaN(parsed)) {
      return
    }

    const rounded = Math.round(parsed * 1000) / 1000;
    setInnerValue(rounded.toString());
    onChange(rounded);
  }

  return (
    <Fieldset id={id} label={label}>
      <label htmlFor={id} hidden>{label}</label>
      <input className="numeric-input" id={id} type="number" value={innerValue} onChange={handleChange} onBlur={handleBlur} />
    </Fieldset>
  )
}
