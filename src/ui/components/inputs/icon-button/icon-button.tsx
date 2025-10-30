import './icon-button.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  kind?: 'success' | 'error';
  circular?: boolean;
  onClick?: () => void;
  onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => void;
}

export function IconButton({ id, label, icon, kind, circular, onClick, onPointerDown }: Props) {
  const classes = [
    "icon-button",
    ...(kind ? [`icon-button--${kind}`] : []),
    ...(circular ? ['icon-button--circular'] : []),
    ...(onPointerDown ? ['drag-trigger'] : []),
  ].join(" ");
  return (
    <button id={id} aria-label={label} className={classes} onClick={() => onClick?.()} onPointerDown={(e) => onPointerDown?.(e)}>
      {icon}
    </button>
  );
}
