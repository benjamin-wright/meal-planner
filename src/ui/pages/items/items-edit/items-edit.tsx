import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Item, ItemKind } from "../../../../models/items";
import { ItemsEditView } from "./items-edit-view";
import { DBContext } from "../../../providers/database/db-context";
import { useContext, useEffect, useState } from "react";
import { Category } from "../../../../models/categories";

export function ItemsEdit() {
const navigate = useNavigate();
  const params = useParams();
  const itemId = params.id ? parseInt(params.id, 10) : null;
  const isNew = params.id === undefined;

  const { stores } = useContext(DBContext);
  const [item, setItem] = useState<Item>({
    id: 0,
    name: "",
    category: 0,
    kind: ItemKind.Ingredient
  });
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    if (!stores) {
      return;
    }

    const fetchCategories = async () => {
      const fetchedCategories = await stores.categoryStore.getAll();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, [stores])

  async function handleSubmit(item: Item) {
    if (!stores) {
      return;
    }

    if (item.id) {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.put({ ...item, readymeal });
    } else {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.add(item.name, item.kind, item.category, readymeal);
    }

    navigate(-1);
  }

  return <ItemsEditView
    item={item}
    isNew={isNew}
    categories={categories}
    onChange={setItem}
    onSubmit={handleSubmit}
  />;
}
