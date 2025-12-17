import './fieldset.css';

type Props = {
  children: React.ReactNode;
  label: string;
  id: string;
  disabled?: boolean;
  horizontal?: boolean;
  group?: boolean;
  className?: string;
}

export function Fieldset({ children, label, id, disabled, horizontal, group, className }: Props) {
  const classList = [
    'fieldset-default',
    (group ? 'fieldset-group' : ''),
    (horizontal ? 'horizontal' : ''),
    className
  ].join(' ').trim();

  return (
    <fieldset className={classList} id={`${id}-fieldset`} disabled={disabled}>
      <div className="legend" id={`${id}-legend`}>
        <span>{label}</span>
      </div>
      {children}
    </fieldset>
  );
}
