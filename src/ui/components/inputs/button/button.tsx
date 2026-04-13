import { MouseEvent } from 'react';
import './button.css';

type Props = {
  id: string;
  content: React.ReactNode;
  onClick: () => void;
  kind?: 'success' | 'error';
  disabled?: boolean;
  preventDefault?: boolean;
  label?: string;
  small?: boolean;
}

export function Button({ id, content, kind, onClick, disabled, preventDefault, label, small }: Props) {
  const classes = [
    "button",
    ...(kind ? [`button--${kind}`] : []),
    ...(small ? ['button--small'] : [])
  ].join(" ");

  function handleOnClick(event: MouseEvent) {
    if (preventDefault) {
      event.preventDefault();
    }

    onClick();
  }
  
  return <button id={id} className={classes} onClick={handleOnClick} disabled={disabled} aria-label={label}>{content}</button>;
}
