import Plus from '../../icons/plus';
import './add-button.css';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  id: string;
}

export function AddButton({ onClick, id, disabled }: Props) {
  const classes = ["glazing", "add-button", ...(disabled ? ["add-button--disabled"] : [])].join(" ");
  
  return (
    <button className={classes} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick();
    }} id={id} aria-label="Add button" disabled={disabled}>
      <Plus />
    </button>
  );
}
