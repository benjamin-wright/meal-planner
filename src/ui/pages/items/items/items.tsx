import { useContext, useEffect, useState } from "react";
import { ItemsView } from "./items-view";
import { DBContext } from "../../../providers/database";
import { Item } from "../../../../models/items";
import { useNavigate } from "react-router-dom";

export function Items() {
  const navigate = useNavigate();

  const { stores } = useContext(DBContext);
  const [items, setItems] = useState<Item[]>([]);

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

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const items = await stores.itemStore.getAll();
      setItems(items);
    })();
  }, [stores]);

  return <ItemsView
    items={items}
    onDelete={handleDelete}
    onEdit={handleEdit}
  />;
}
