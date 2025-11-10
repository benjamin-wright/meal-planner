import { Reorder } from "motion/react";
import { Category } from "../../../../../models/categories"
import DragHandle from "../../../../components/icons/drag-handle";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";
import './category-item.css'
import { SlideOutControl } from "../../../../components/containers/slide-out-controls/slide-out-control";

type Props = {
  category: Category
  sorting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryItem({ category, sorting, onEdit, onDelete }: Props) {
  return sorting ?
    (
      <Reorder.Item
        value={category}
        className="category-item glazing"
        style={{ touchAction: 'none' }}
      >
        <IconButton icon={<DragHandle />} />
        <span className="category-item-name">{category.name}</span>
      </Reorder.Item>
    )
    :
    (
      <SlideOutControl groupId={category.name} onEdit={onEdit} onDelete={onDelete}>
        <li className="category-item glazing">
          <span className="category-item-name">{category.name}</span>
        </li>
      </SlideOutControl>
    );
}
