import { useContext, useEffect } from "react";
import { Item, ItemKind } from "../../models/items";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { useIdCache } from "./useIdCache";

export function useItem(key: string, itemId: number | null): [Item, (item: Item) => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const categoryId = useIdCache("new-category");
  const [item, setItem] = useSavedState<Item>(key, {
    id: 0,
    name: "",
    category: categoryId || 0,
    kind: ItemKind.Ingredient
  });

  useEffect(() => {
    if (!stores || !itemId) {
      return;
    }

    const fetchItem = async () => {
      const fetchedItem = await stores.itemStore.get(itemId);
      if (fetchedItem) {
        fetchedItem.category = categoryId || fetchedItem.category;
        setItem(fetchedItem);
      }
    };

    fetchItem();
  }, [itemId, stores, setItem, categoryId]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    setItem({ ...item, category: categoryId || item.category });
  }, [categoryId, item, setItem]);

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

  return [item, setItem, save];
}
