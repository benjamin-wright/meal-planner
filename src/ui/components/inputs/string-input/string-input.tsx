import { Fieldset } from '../fieldset/fieldset';
import './string-input.css';

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  lowercase?: boolean;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export function StringInput({ id, label, placeholder, disabled, lowercase, value, className, onChange }: Props) {
  function handleChange(newValue: string) {
    if (lowercase) {
      newValue = newValue.toLowerCase();
    }
    onChange(newValue);
  }

  return <Fieldset label={label} id={id} disabled={disabled} className={className}>
    <label htmlFor={id} hidden>{label}</label>
    <input className="string-input" type="text" id={id} placeholder={placeholder} value={value} onChange={(e) => {handleChange(e.target.value)}} />
  </Fieldset>;
}
