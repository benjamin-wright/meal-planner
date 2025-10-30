import { Reorder } from 'motion/react';
import './categories-list.css'
import { Category } from '../../../../../models/categories';
import { CategoryItem } from './category-item';

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
}

export function CategoriesList({ categories, onReorder }: Props) {
  return (
    <Reorder.Group axis="y" values={categories} onReorder={onReorder} className="categories-list" sx={{ overflowY: 'scroll' }}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Reorder.Group>
  );
}
