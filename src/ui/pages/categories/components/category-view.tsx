import { DragControls } from "motion/react";
import { Category } from "../../../../models/categories";
import { DetailView } from "../../../components/detail-view";

interface CategoryViewProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  dragControls?: DragControls;
  working?: boolean;
}

export function CategoryView({ category, onEdit, onDelete, dragControls, working }: CategoryViewProps) {
  return (
    <DetailView
      title={category.name}
      horizontal
      narrow
      dragControls={dragControls}
      working={working}
      onEdit={() => onEdit && onEdit(category)}
      onDelete={() => onDelete && onDelete(category)}
    >
    </DetailView>
  )
}
