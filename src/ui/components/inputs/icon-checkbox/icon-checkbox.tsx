import './icon-checkbox.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  selected: boolean;
  onChange?: (value: boolean) => void;
}

export function IconCheckbox({ id, label, icon, selected, onChange }: Props) {
  const classes = [
    "icon-checkbox",
    ...(selected ? ['icon-checkbox--selected'] : []),
  ].join(" ");
  return (
    <label aria-label={label} className={classes}>
      {icon}
      <input
        type="checkbox"
        id={id}
        checked={selected}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.stopPropagation();
          onChange?.(!selected);
        }}
      />
    </label>
  );
}
