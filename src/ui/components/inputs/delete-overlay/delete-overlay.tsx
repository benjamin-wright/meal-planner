import Trash from '../../icons/trash';
import './delete-overlay.css';

type Props = {
  onClick: () => void;
  id: string;
  deleting: boolean;
}

export function DeleteOverlay({ onClick, id, deleting }: Props) {
  const classNames = ["delete-overlay", ...(deleting ? ["delete-overlay--deleting"] : [])].join(" ");

  return (
    <button className={classNames} disabled={!deleting} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick();
    }} id={id} aria-label="Delete overlay">
      {
        <Trash />
      }
    </button>
  );
}
