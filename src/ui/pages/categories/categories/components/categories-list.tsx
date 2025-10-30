import { Reorder } from 'motion/react';
import './categories-list.css'
import { Category } from '../../../../../models/categories';
import { CategoryItem } from './category-item';

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  editing: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoriesList({ categories, onReorder, editing, onEdit, onDelete }: Props) {
  return (
    <Reorder.Group axis="y" values={categories} onReorder={onReorder} className="categories-list" sx={{ overflowY: 'scroll' }}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          editing={editing}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category)}
        />
      ))}
    </Reorder.Group>
  );
}
