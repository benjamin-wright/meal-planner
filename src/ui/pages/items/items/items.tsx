import { ItemsView } from "./items-view";
import { Item } from "../../../../models/items";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useItems } from "../../../hooks/useItems";

export function Items() {
  const navigate = useNavigate();
  const [items, deleteItem] = useItems();
  const [categories] = useCategories();

  function handleEdit(item: Item) {
    navigate(`/items/${item.id}`);
  }

  function handleNew() {
    navigate(`/items/new`);
  }

  return <ItemsView
    items={items}
    categories={categories}
    onDelete={deleteItem}
    onEdit={handleEdit}
    onNew={handleNew}
  />;
}
