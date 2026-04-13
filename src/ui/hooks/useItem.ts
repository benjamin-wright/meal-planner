import { useContext, useEffect, useState } from "react";
import { Item, ItemKind } from "../../models/items";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { useIdCache } from "./useIdCache";

export function useItem(key: string, itemId: number | null): [Item, (item: Item) => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const categoryId = useIdCache("new-category");
  const [overrideCategory, setOverrideCategory] = useState(true);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, stores, categoryId]);

  useEffect(() => {
    if (!categoryId || item.category === categoryId) {
      return;
    }

    if (!overrideCategory) {
      return;
    }
    setOverrideCategory(false);

    setItem({
      ...item,
      category: categoryId
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, item.category, overrideCategory]);

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
