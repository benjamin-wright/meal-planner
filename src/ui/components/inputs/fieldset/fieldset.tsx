import './fieldset.css';

type Props = {
  children: React.ReactNode;
  label: string;
  id: string;
  disabled?: boolean;
  group?: boolean;
}

export function Fieldset({ children, label, id, disabled, group }: Props) {
  const classList = ['fieldset-default', (group ? 'fieldset-group' : '')].join(' ').trim();

  return (
    <fieldset className={classList} id={`${id}-fieldset`} disabled={disabled}>
      <div className="legend" id={`${id}-legend`}>
        <span>{label}</span>
      </div>
      {children}
    </fieldset>
  );
}
