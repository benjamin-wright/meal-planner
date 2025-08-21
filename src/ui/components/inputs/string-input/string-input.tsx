import { useState } from 'react';
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
  const [inputValue, setInputValue] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === inputValue) return; // Avoid unnecessary updates

    setInputValue(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== value && !disabled) {
      onChange(e.target.value);
    }
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(inputValue);
    }
  };

  return <fieldset className="string-input" disabled={disabled}>
    <legend>{label}</legend>
    <input type="text" id={id} placeholder={placeholder} value={inputValue} onKeyUp={handleEnterPress} onChange={handleChange} onBlur={handleBlur} />
  </fieldset>;
}
