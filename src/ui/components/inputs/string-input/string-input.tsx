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
  return <fieldset className="string-input" disabled={disabled}>
    <legend>{label}</legend>
    <label htmlFor={id} hidden>{label}</label>
    <input type="text" id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </fieldset>;
}
