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
  const [ pendingItems, setPendingItems ] = useState<{id: number, timeoutId: number}[]>([]);

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
      pendingItems.forEach(item => {
        window.clearTimeout(item.timeoutId);
      });
    };
  }, [ settingStore, shoppingStore, categoryStore, unitStore ]);

  async function reset() {
    if (!ingredientStore || !unitStore || !recipieStore || !mealStore || !extraStore || !shoppingStore) {
      return;
    }
    
    // Clear any pending timeouts
    pendingItems.forEach(item => {
      window.clearTimeout(item.timeoutId);
    });
    setPendingItems([]);
    
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
    setUndo([...undo, { id: item.id, got: item.got }]);
    if (redo.length > 0) { setRedo([]); }

    if (!item.got) {
      // If checking an item, add pending state but delay the actual update
      const timeoutId = window.setTimeout(() => {
        // Remove from pending after delay
        setPendingItems(current => current.filter(p => p.id !== item.id));
        
        // Update the item got status in the DB
        // Use a functional update to ensure we're working with the latest state
        setItems(currentItems => {
          const updatedItems = [...currentItems];
          const index = updatedItems.findIndex(i => i.id === item.id);
          
          // Only update if the item is still in pending state
          if (index !== -1 && updatedItems[index].pending) {
            shoppingStore?.check(item.id, true);
            updatedItems[index] = {...updatedItems[index], got: true, pending: false};
          }
          return updatedItems;
        });
      }, 2000);
      
      setPendingItems(current => [...current, { id: item.id, timeoutId }]);
      
      // Update the UI immediately to show the pending state
      updateItemVisually(item.id);
    } else {
      // If unchecking, do it immediately
      updateItem(item.id, !item.got);
    }
  }

  function updateItemVisually(id: number) {
    // This only updates the UI, doesn't save to DB
    setItems(current => {
      const updatedItems = [...current];
      const index = updatedItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        updatedItems[index] = {...updatedItems[index], pending: true};
      }
      return updatedItems;
    });
  }

  function updateItem(id: number, got: boolean) {
    // Clear any pending timeout for this item if it exists
    const pending = pendingItems.find(p => p.id === id);
    if (pending) {
      window.clearTimeout(pending.timeoutId);
      setPendingItems(current => current.filter(p => p.id !== id));
    }
    
    // Update local state using functional update pattern to ensure we're working with the latest state
    setItems(current => {
      const updatedItems = [...current];
      const index = updatedItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        updatedItems[index] = {...updatedItems[index], got, pending: false};
      }
      return updatedItems;
    });

    // Update the database
    shoppingStore?.check(id, got);
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
    updateItem(lastAction.id, lastAction.got);
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
    updateItem(lastAction.id, !lastAction.got);
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
