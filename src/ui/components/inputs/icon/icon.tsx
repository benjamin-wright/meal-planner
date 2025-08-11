import './icon.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export function Icon({ id, label, icon, onClick, size }: Props) {
  const sizes = {
    small: "0.75em",
    medium: "1em",
    large: "2em"
  };

  if (onClick) {
    return (
      <button id={id} aria-label={label} className="icon" onClick={() => onClick()} style={{
        fontSize: sizes[size || "medium"]
      }} >
        {icon}
      </button>
    );
  }

  return (
    <fieldset className="icon" style={{
      fontSize: sizes[size || "medium"]
    }}>
      {icon}
    </fieldset>
  )
}