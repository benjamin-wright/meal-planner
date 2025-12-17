import { CategoriesView } from "./categories-view";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export function Categories() {
  const navigate = useNavigate();
  const [categories, reorderCategories, deleteCategory] = useCategories();

  return (
    <CategoriesView
      categories={categories}
      onReorder={reorderCategories}
      onEdit={category => navigate(`/categories/${category.id}`)}
      onDelete={deleteCategory}
      onNew={() => navigate('/categories/new')}
    />
  );
}
