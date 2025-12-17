import { useContext, useEffect } from "react";
import { Item, ItemKind } from "../../models/items";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";

export function useItem(key: string, itemId: number | null): [Item, (item: Item) => void, () => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const [item, setItem, clearItem] = useSavedState<Item>(key, {
    id: 0,
    name: "",
    category: 0,
    kind: ItemKind.Ingredient
  });

  useEffect(() => {
    if (!stores || !itemId) {
      return;
    }

    const fetchItem = async () => {
      const fetchedItem = await stores.itemStore.get(itemId);
      if (fetchedItem) {
        setItem(fetchedItem);
      }
    };

    fetchItem();
  }, [itemId, stores]);

  async function save() {
    if (!stores) {
      return;
    }

    if (item.id) {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.put({ ...item, readymeal });
    } else {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.add(item.name, item.category, item.kind, readymeal);
    }
  }

  return [item, setItem, clearItem, save];
}
