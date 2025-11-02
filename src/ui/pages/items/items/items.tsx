import { useContext, useEffect, useState } from "react";
import { ItemsView } from "./items-view";
import { DBContext } from "../../../providers/database";
import { Item, ItemType } from "../../../../models/items";

export function Items() {
  const { stores } = useContext(DBContext);
  const [ items, setItems ] = useState<Item[]>([]);
  const [ itemType, setItemType ] = useState<ItemType>(ItemType.Ingredient);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const items = await stores.itemStore.getAll();
      setItems(items);
    })();
  }, [stores]);

  return <ItemsView items={items} itemType={itemType} onItemTypeChanged={setItemType} />;
}