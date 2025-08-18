import './button.css';

type Props = {
  id: string;
  content: string;
  onClick: () => void;
  kind?: 'success' | 'error';
  disabled?: boolean;
}

export function Button({ id, content, kind, onClick, disabled }: Props) {
  const classes = ["button", ...(kind ? [`button--${kind}`] : [])].join(" ");
  return <button id={id} className={classes} onClick={onClick} disabled={disabled}>{content}</button>;
}
