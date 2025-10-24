import Check from '../../icons/check';
import Trash from '../../icons/trash';
import './delete-button.css';

type Props = {
  onClick: () => void;
  id: string;
  disabled?: boolean;
  deleting: boolean;
}

export function DeleteButton({ onClick, id, deleting, disabled }: Props) {
  const classNames = ["glazing", "delete-button", ...(deleting ? ["delete-button--deleting"] : [])].join(" ");

  return (
    <button className={classNames} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick();
    }} id={id} aria-label="Delete button" disabled={disabled}>
      {
        deleting ?
        <Check /> :
        <Trash />
      }
    </button>
  );
}
