import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { Item } from "../../models/items";
import { ActionQueue } from "../../utils/action-queue";

const queue = new ActionQueue();

export function useItems(): [Item[], (item: Item) => void] {
  const { stores } = useContext(DBContext);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const items = await stores.itemStore.getAll();
      setItems(items);
    })();
  }, [stores]);

  function deleteItem(item: Item) {
    if (!stores) return;

    queue.enqueue(async () => {
      await stores.itemStore.delete(item.id);
    });
    setItems(items.filter(i => i.id !== item.id));
  }

  return [items, deleteItem];
}
