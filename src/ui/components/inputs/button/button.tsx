import './button.css';

type Props = {
  content: string;
  onClick: () => void;
  kind?: 'success' | 'error';
  disabled?: boolean;
}

export function Button({ content, kind, onClick, disabled }: Props) {
  const classes = [ "button", ...(kind ? [`button--${kind}`] : [])].join(" ");
  return <button className={classes} onClick={onClick} disabled={disabled}>{content}</button>;
}