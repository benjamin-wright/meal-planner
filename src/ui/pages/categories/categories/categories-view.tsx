import { useState } from "react";
import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { Reorder } from "framer-motion";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { CategoryItem } from "./components/category-item";
import './categories-view.css'

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onNew: () => void;
};

export function CategoriesView({ categories, onReorder, onEdit, onDelete, onNew }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <Page title="Categories" onEdit={(editing: boolean) => {
      setEditing(editing);
    }}>
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
        <AddButton id="add-category-button" onClick={onNew} disabled={editing} />
      </Reorder.Group>
    </Page>
  );
}
