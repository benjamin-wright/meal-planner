import './icon.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function Icon({ id, label, icon, onClick }: Props) {
  if (onClick) {
    return (
      <button id={id} aria-label={label} className="icon" onClick={() => onClick()} >
        {icon}
      </button>
    );
  }

  return (
    <fieldset className="icon">
      {icon}
    </fieldset>
  )
}