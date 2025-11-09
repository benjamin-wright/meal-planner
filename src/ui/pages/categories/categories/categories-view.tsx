import { useState } from "react";
import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { Reorder } from "framer-motion";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { CategoryItem } from "./components/category-item";
import './categories-view.css'
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onNew: () => void;
};

export function CategoriesView({ categories, onReorder, onEdit, onDelete, onNew }: Props) {
  const [editing, setEditing] = useState(false);

  function wrapper(children: React.ReactNode[]) {
    return editing ? (
      <Reorder.Group axis="y" values={categories} onReorder={onReorder} className="categories-list" sx={{ overflowY: 'scroll' }}>
        {children}
      </Reorder.Group>
    ) : (
      <SlideOutGroup>
        <ul className="categories-list">
          {children}
        </ul>
      </SlideOutGroup>
    )
  }

  return (
    <Page title="Categories" onEdit={(editing: boolean) => {
      setEditing(editing);
    }}>
      {
        wrapper(
          categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              editing={editing}
              onEdit={() => onEdit(category)}
              onDelete={() => onDelete(category)}
            />
          )).concat(
            <AddButton key="add-category-button" id="add-category-button" onClick={onNew} disabled={editing} />
          )
        )
      }
      
    </Page>
  );
}
