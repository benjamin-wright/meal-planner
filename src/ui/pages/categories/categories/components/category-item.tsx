import { Reorder, useDragControls } from "motion/react";
import { Category } from "../../../../../models/categories"
import DragHandle from "../../../../components/icons/drag-handle";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";
import './category-item.css'
import Trash from "../../../../components/icons/trash";

type Props = {
  category: Category
  editing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryItem({ category, editing, onEdit, onDelete }: Props) {
  const dragControls = useDragControls();

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!editing) { return; }

    dragControls.start(e);
  }

  function handleClick(event: React.MouseEvent) {
    if (editing) {
      event.preventDefault();
      return;
    }
    onEdit();
  }

  return (
    <Reorder.Item
      value={category}
      dragListener={false}
      dragControls={dragControls}
      className="category-item glazing"
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {editing && <IconButton icon={<DragHandle />} />}
      <span className="category-item-name">{category.name}</span>
      {editing || <span>&gt;</span>}
      {editing && <IconButton icon={<Trash />} kind="error" label="Delete category" onClick={onDelete} />}
    </Reorder.Item>
  );
}
