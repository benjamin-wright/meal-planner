import './fieldset.css';

type Props = {
  children: React.ReactNode;
  label: string;
  id: string;
  disabled?: boolean;
}

export function Fieldset({ children, label, id, disabled }: Props) {
  return (
    <fieldset className="fieldset-default" id={`${id}-fieldset`} aria-labelledby={`${id}-legend`} disabled={disabled}>
      <div className="legend" id={`${id}-legend`}>
        <span>{label}</span>
      </div>
      <label hidden htmlFor={id}>
        {label}
      </label>
      {children}
    </fieldset>
  );
}
