import { useContext, useState } from 'react';
import Pencil from '../../icons/pencil';
import Trash from '../../icons/trash';
import { IconButton } from '../icon-button/icon-button';
import './sliding-button.css';
import { SlidingButtonGroupContext } from './sliding-button-group-context';

type Props = {
  id: string;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function SlidingButton({ id, title, onEdit, onDelete }: Props) {
  const context = useContext(SlidingButtonGroupContext);
  const [ isOpen, setIsOpen ] = useState(false);

  function getIsOpen() {
    if (context) {
      return context.isOpen(id);
    } else {
      return isOpen;
    }
  }

  function toggle() {
    if (context) {
      context.toggle(id);
    } else {
      setIsOpen(!isOpen);
    }
  }

  const classes = [ "sliding-button__content", ...(getIsOpen() ? ["sliding-button__content--open"] : []) ].join(" ");

  return <div className="sliding-button glazing">
    <button className="sliding-button__title" onClick={toggle}>
      <h2>{title}</h2>
    </button>
    <div className={classes}>
      <IconButton id={`${id}-edit`} label="edit" icon={<Pencil />} onClick={onEdit} />
      <IconButton id={`${id}-delete`} label="delete" kind="error" icon={<Trash />} onClick={onDelete} />
    </div>
  </div>;
}