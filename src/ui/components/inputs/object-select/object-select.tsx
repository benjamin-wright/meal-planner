import './object-select.css';

type Props<T> = {
  options: T[];
  value?: T;
  label: string;
  onChange: (value?: T) => void;
  toDisplay: (option: T) => string;
  disabled?: boolean;
}

export function ObjectSelect<T>({ options, value, label, onChange, toDisplay, disabled }: Props<T>) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = options.find((o) => toDisplay(o) === event.target.value);
    if (selectedValue === value) return; // Avoid unnecessary updates

    onChange(selectedValue);
  }

  return (
    <fieldset className="object-select" disabled={disabled}>
      <legend>{label}</legend>
      <label className="hidden" htmlFor={label}>
        {label}
      </label>
      <select id={label} value={value ? toDisplay(value) : ""} onChange={handleChange}>
        {options.map((option) => (
          <option key={toDisplay(option)} value={toDisplay(option)}>
            {toDisplay(option)}
          </option>
      ))}
      </select>
    </fieldset>
  );
}