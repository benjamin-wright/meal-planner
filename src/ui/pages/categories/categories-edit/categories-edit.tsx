import { useNavigate, useParams } from "react-router-dom";
import { CategoriesEditView } from "./categories-edit-view";
import { useCategory } from "../../../hooks/useCategory";

export function CategoriesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id ? parseInt(params.id, 10) : 0;
  const isNew = params.id === undefined;

  const [category, setCategory, save] = useCategory("categories-edit-page", categoryId);

  async function handleSave() {
    await save();
    navigate(-1);
  }

  return (
    <CategoriesEditView
      category={category}
      isNew={isNew}
      onUpdate={setCategory}
      onSave={handleSave}
    />
  );
}
