import { Page } from "../../components/page";
import { Add, Redo, Replay, Undo } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { AlertContext } from "../../providers/alerts";
import { ListView } from "./components/list-view";
import { ShoppingViewItem } from "../../../services/shopping";
import { useNavigate } from "react-router-dom";
import { getShoppingListItems, resetShoppingList } from "../../../services/shopping";
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

type ShoppingListToggle = {
  id: number;
  got: boolean;
}

const DEBOUNCE_PERIOD = 2000;

export function List() {
  const navigate = useNavigate();

  const { settingStore, ingredientStore, categoryStore, unitStore, recipieStore, mealStore, extraStore, shoppingStore } = useContext(DBContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [ resetPrompt, setResetPrompt ] = useState(false);
  const [ speedDial, setSpeedDial ] = useState(false);
  const [ items, setItems ] = useState<ShoppingViewItem[]>([]);
  const [ categories, setCategories ] = useState<string[]>([]);
  const [ undo, setUndo ] = useState<ShoppingListToggle[]>([]);
  const [ redo, setRedo ] = useState<ShoppingListToggle[]>([]);
  const [ debounceTimeout, setDebounceTimeout ] = useState<number | undefined>();

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
    
    // Cleanup function to clear any pending timeouts when unmounting
    return () => {
      if (debounceTimeout) {
        window.clearTimeout(debounceTimeout);
      }
    };
  }, [ settingStore, shoppingStore, categoryStore, unitStore ]);

  async function reset() {
    if (!ingredientStore || !unitStore || !recipieStore || !mealStore || !extraStore || !shoppingStore) {
      return;
    }
    
    // Clear any pending timeouts
    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout);
      setDebounceTimeout(undefined);
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
    setUndo([]);
    setRedo([]);
    fetchItems();
  }

  function handleCheckItem(item: ShoppingViewItem) {
    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(window.setTimeout(() => {
      setDebounceTimeout(undefined);
      commitPending();
    }, DEBOUNCE_PERIOD));

    if (item.pending) {
      updateItem(item.id, false, false);
      return
    }

    setRedo([]);
    
    if (!item.got) {
      updateItem(item.id, false, true);
    } else {
      shoppingStore?.check(item.id, false);
      updateItem(item.id, false, false);
      setUndo(current => [...current, { id: item.id, got: false }]);
    }
  }

  function commitPending() {
    setItems(current => {
      const pending = current.filter(i => i.pending);
      pending.forEach(item => { shoppingStore?.check(item.id, true) });
      setUndo([...undo, ...pending.map(item => ({ id: item.id, got: true }))]);
      return current.map(item => item.pending ? {...item, got: true, pending: false} : item);
    });
  }

  function updateItem(id: number, got: boolean, pending: boolean) {
    setItems(current => {
      const updatedItems = [...current];
      const index = updatedItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        updatedItems[index] = {...updatedItems[index], got, pending};
      }
      return updatedItems;
    });
  }

  function handleUndo() {
    if (undo.length === 0) {
      return;
    }
    const lastAction = undo.pop();
    if (!lastAction) {
      return;
    }

    setRedo([...redo, lastAction]);
    updateItem(lastAction.id, !lastAction.got, false);
  }

  function handleRedo() {
    if (redo.length === 0) {
      return;
    }
    const lastAction = redo.pop();
    if (!lastAction) {
      return;
    }

    setUndo([...undo, lastAction]);
    updateItem(lastAction.id, lastAction.got, false);
  }

  return <Page title="List" showNav sx={{
    paddingBottom: "5em",
  }}>
    <ListView items={items} categories={categories} onCheck={handleCheckItem} onEdit={(item: ShoppingViewItem) => navigate(`/list/${item.id}`)} />
    <Backdrop open={speedDial} />
    <SpeedDial
      ariaLabel="ContextMenu"
      icon={<SpeedDialIcon />}
      open={speedDial}
      onOpen={() => setSpeedDial(true)}
      onClose={() => setSpeedDial(false)}
      sx={{
        position: "fixed",
        bottom: "2em",
        right: "2em",
      }}
    >
      <SpeedDialAction
        icon={<Add />}
        tooltipTitle="new"
        onClick={() => {
          setSpeedDial(false);
          navigate("/list/new");
        }}
      />
      <SpeedDialAction
        icon={<Replay />}
        tooltipTitle="reset"
        onClick={() => {
          setSpeedDial(false);
          setResetPrompt(true);
        }}
      />
      <SpeedDialAction FabProps={{
        sx: {
          opacity: redo.length > 0 ? 1 : 0.25
        }
      }}
        icon={<Redo />}
        tooltipTitle="redo"
        onClick={handleRedo}
      />
      <SpeedDialAction FabProps={{
        sx: {
          opacity: undo.length > 0 ? 1 : 0.25
        }
      }}
        icon={<Undo />}
        tooltipTitle="undo"
        onClick={handleUndo}
      />
    </SpeedDial>
    <ConfirmDialog
      open={resetPrompt}
      message="Resetting shopping list?"
      disableRestoreFocus
      onConfirm={() => {
        reset().then(() => setMessage("Shopping list reset")).catch((error) => setError(error.message));
        setResetPrompt(false);
      }}
      onCancel={() => setResetPrompt(false)}
    />
  </ Page>;
}
