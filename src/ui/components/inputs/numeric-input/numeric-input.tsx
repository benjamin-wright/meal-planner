import { useEffect, useState } from "react";
import { Fieldset } from "../fieldset/fieldset"
import "./numeric-input.css"
import { fixJSRounding } from "../../../../utils/number";

type Props = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function NumericInput({ id, label, value, onChange }: Props) {
  const [innerValue, setInnerValue] = useState(value.toString());

  useEffect(() => {
    setInnerValue(value.toString());
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInnerValue(newValue);

    const parsed = fixJSRounding(parseFloat(newValue));
    if (!isNaN(parsed) && parsed.toString() === newValue) {
      onChange(parsed);
    }
  }

  return (
    <Fieldset id={id} label={label}>
      <label htmlFor={id} hidden>{label}</label>
      <input className="numeric-input" id={id} type="number" value={innerValue} onChange={handleChange} />
    </Fieldset>
  )
}
