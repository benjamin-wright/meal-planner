import { Reorder, useDragControls } from "motion/react";
import { Category } from "../../../../../models/categories"
import DragHandle from "../../../../components/icons/drag-handle";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";
import './category-item.css'

type Props = {
  category: Category
}

export function CategoryItem({ category }: Props) {
  const controls = useDragControls();

  const handleDragStart = (event: React.PointerEvent) => {
    event.preventDefault();
    controls.start(event);
  };

  return (
    <Reorder.Item value={category} dragListener={false} dragControls={controls} className="category-item glazing">
      <IconButton icon={<DragHandle />} onClick={() => { }} onPointerDown={handleDragStart} />
      <span className="category-item-name">{category.name}</span>
    </Reorder.Item>
  );
}
