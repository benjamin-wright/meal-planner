import { ItemsView } from "./items-view";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useItems } from "../../../hooks/useItems";

export function Items() {
  const navigate = useNavigate();
  const [items, deleteItem] = useItems();
  const [categories] = useCategories();

  return <ItemsView
    items={items}
    categories={categories}
    onDelete={deleteItem}
    onEdit={(item) => navigate(`/items/${item.id}`)}
    onNew={() => navigate(`/items/new`)}
  />;
}
