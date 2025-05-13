import Fab from "@mui/material/Fab";
import { Page } from "../../components/page";
import { Replay } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { AlertContext } from "../../providers/alerts";
import { ListView } from "./components/list-view";
import { ShoppingViewItem } from "../../../services/shopping";
import { FloatingAddButton } from "../../components/floating-add-button";
import { useNavigate } from "react-router-dom";
import { getShoppingListItems, resetShoppingList } from "../../../services/shopping";

export function List() {
  const navigate = useNavigate();

  const { settingStore, ingredientStore, categoryStore, unitStore, recipieStore, mealStore, extraStore, shoppingStore } = useContext(DBContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [ open, setOpen ] = useState(false);
  const [ items, setItems ] = useState<ShoppingViewItem[]>([]);
  const [ categories, setCategories ] = useState<string[]>([]);

  async function fetchItems() {
    if (!settingStore || !categoryStore || !unitStore || !shoppingStore) {
      return;
    }

    const { items, categories } = await getShoppingListItems({
      settingStore,
      shoppingStore,
      categoryStore,
      unitStore,
      setError
    });
    setItems(items);
    setCategories(categories);
  }

  useEffect(() => {
    fetchItems();
  }, [ settingStore, shoppingStore, categoryStore, unitStore ]);

  async function reset() {
    if (!ingredientStore || !unitStore || !recipieStore || !mealStore || !extraStore || !shoppingStore) {
      return;
    }
    await resetShoppingList({
      ingredientStore,
      unitStore,
      recipieStore,
      mealStore,
      extraStore,
      shoppingStore,
      setError
    });
    fetchItems();
  }

  function checkItem(item: ShoppingViewItem) {
    if (!shoppingStore) {
      return
    }

    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      updatedItems[index] = {...item, got: !item.got};
    }
    setItems(updatedItems);

    shoppingStore.check(item.id, !item.got);
  } 

  return <Page title="List" showNav sx={{
    paddingBottom: "5em",
  }}>
    <ListView items={items} categories={categories} onCheck={checkItem} onEdit={(item: ShoppingViewItem) => navigate(`/list/${item.id}`)} />
    <Fab color="primary" sx={{
      position: "fixed",
      bottom: "2em",
      left: "2em",
    }} onClick={() => setOpen(true)}>
      <Replay />
    </Fab>
    <FloatingAddButton
      to="/list/new"
    />
    <ConfirmDialog
      open={open}
      message="Resetting shopping list?"
      onConfirm={() => {
        reset().then(() => setMessage("Shopping list reset")).catch((error) => setError(error.message));
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    />
  </ Page>;
}
