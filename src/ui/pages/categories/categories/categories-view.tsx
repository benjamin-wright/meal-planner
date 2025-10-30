import { useState } from "react";
import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { CategoriesList } from "./components/categories-list";

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoriesView({ categories, onReorder, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <Page title="Categories" onEdit={(editing: boolean) => {
      setEditing(editing);
    }}>
      <CategoriesList
        categories={categories}
        onReorder={onReorder}
        editing={editing}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Page>
  );
}
