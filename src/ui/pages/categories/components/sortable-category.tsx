import { Category } from "../../../../models/categories";
import { Reorder, useDragControls } from "motion/react";
import { CategoryView } from "./category-view";

interface SortableCategoryProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  working?: boolean;
}

export function SortableCategory({ category, onEdit, onDelete, working }: SortableCategoryProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item key={category.id} value={category} dragListener={false} dragControls={dragControls}>
      <CategoryView category={category} onEdit={onEdit} onDelete={onDelete} dragControls={dragControls} working={working} />
    </Reorder.Item>
  );
}
