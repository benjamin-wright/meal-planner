import './button.css';

type Props = {
  id: string;
  content: React.ReactNode;
  onClick: () => void;
  kind?: 'success' | 'error';
  disabled?: boolean;
  label?: string;
  small?: boolean;
}

export function Button({ id, content, kind, onClick, disabled, label, small }: Props) {
  const classes = [
    "button",
    ...(kind ? [`button--${kind}`] : []),
    ...(small ? ['button--small'] : [])
  ].join(" ");
  
  return <button id={id} className={classes} onClick={onClick} disabled={disabled} aria-label={label}>{content}</button>;
}
