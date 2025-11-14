import './icon-button.css';

type Props = {
  id?: string;
  label?: string;
  icon: React.ReactNode;
  kind?: 'success' | 'error' | 'selected';
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
    <button
      id={id}
      aria-label={label}
      className={classes}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick?.();
      }}
      onPointerDown={(e) => onPointerDown?.(e)}
    >
      {icon}
    </button>
  );
}
