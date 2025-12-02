import { useContext, useEffect, useState } from "react";
import { ItemsView } from "./items-view";
import { DBContext } from "../../../providers/database/db-context";
import { Item } from "../../../../models/items";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../../models/categories";

export function Items() {
  const navigate = useNavigate();

  const { stores } = useContext(DBContext);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  function handleDelete(item: Item) {
    if (!stores) return;
    (async () => {
      await stores.itemStore.delete(item.id);
    })();
    setItems(items.filter(i => i.id !== item.id));
  }

  function handleEdit(item: Item) {
    navigate(`/items/${item.id}`);
  }

  function handleNew() {
    navigate(`/items/new`);
  }

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const items = await stores.itemStore.getAll();
      setItems(items);

      const categories = await stores.categoryStore.getAll();
      setCategories(categories);
    })();
  }, [stores]);

  return <ItemsView
    items={items}
    categories={categories}
    onDelete={handleDelete}
    onEdit={handleEdit}
    onNew={handleNew}
  />;
}
