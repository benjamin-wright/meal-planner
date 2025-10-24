import Plus from '../../icons/plus';
import './add-button.css';

type Props = {
  onClick: () => void;
  id: string;
}

export function AddButton({ onClick, id }: Props) {
  return (
    <button className="add-button glazing" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick();
    }} id={id} aria-label="Add button">
      <Plus />
    </button>
  );
}
