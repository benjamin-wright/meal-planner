import './icon-button.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  kind?: 'success' | 'error';
  onClick: () => void;
}

export function IconButton({ id, label, icon, kind, onClick }: Props) {
  const classes = ["icon-button", ...(kind ? [`icon-button--${kind}`] : [])].join(" ");

  return (
    <button id={id} aria-label={label} className={classes} onClick={() => onClick()} >
      {icon}
    </button>
  );
}