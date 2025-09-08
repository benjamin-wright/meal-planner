import { Fieldset } from '../fieldset/fieldset';
import './string-input.css';

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function StringInput({ id, label, placeholder, disabled, value, onChange }: Props) {
  return <Fieldset label={label} id={id} disabled={disabled}>
    <input className="string-input" type="text" id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </Fieldset>;
}
