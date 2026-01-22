import { useNavigate, useParams } from "react-router-dom";
import { ItemsEditView } from "./items-edit-view";
import { useItem } from "../../../hooks/useItem";
import { useCategories } from "../../../hooks/useCategories";

export function RecipiesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params.id ? parseInt(params.id, 10) : null;
  const isNew = params.id === undefined;

  const [item, setItem, saveItem] = useItem('recipies-edit-page', itemId);
  const [categories] = useCategories();

  async function handleSubmit() {
    await saveItem();
    navigate(-1);
  }

  function handleNewCategory() {
    navigate('/categories/new');
  }

  return <ItemsEditView
    item={item}
    isNew={isNew}
    categories={categories}
    onChange={setItem}
    onSubmit={handleSubmit}
    onNewCategory={handleNewCategory}
  />;
}
