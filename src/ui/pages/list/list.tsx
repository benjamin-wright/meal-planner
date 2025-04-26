import Fab from "@mui/material/Fab";
import { Page } from "../../components/page";
import { Replay } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { ShoppingItem } from "../../../models/shopping-item";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { AlertContext } from "../../providers/alerts";

export function List() {
  const { ingredientStore, unitStore, recipieStore, mealStore, extraStore, shoppingStore } = useContext(DBContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [ open, setOpen ] = useState(false);
  const [ items, setItems ] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      if (!shoppingStore) {
        return;
      }

      const items = await shoppingStore.getAll();
      setItems(items);
    }

    fetchItems();
  }, [ shoppingStore ]);

  async function reset() {
    if (!ingredientStore || !unitStore || !recipieStore || !mealStore || !extraStore || !shoppingStore) {
      return;
    }
    
    await shoppingStore.clear();

    const meals = await mealStore.getAll();
    const extras = await extraStore.getAll();
    const shoppingMap = new Map<number, ShoppingItem>();

    for (const meal of meals) {
      const recipie = await recipieStore.get(meal.recipieId);
      if (!recipie) {
        console.warn(`Recipie ${meal.recipieId} not found for meal ${meal.id}`);
        continue;
      }

      for (const recipieIngredient of recipie.ingredients) {
        const ingredient = await ingredientStore.get(recipieIngredient.id);
        if (!ingredient) {
          console.warn(`Ingredient ${recipieIngredient.id} not found for recipie ${recipie.id}`);
          continue;
        }

        const unit = await unitStore.get(recipieIngredient.unit);
        if (!unit) {
          console.warn(`Unit ${recipieIngredient.unit} not found for recipie ${recipie.id}`);
          continue;
        }

        let found = false;
        for (const [ recipieId, shoppingItem ] of shoppingMap) {
          if (recipieId === meal.recipieId && shoppingItem.unitType === unit.type) {
            found = true;
            shoppingItem.quantity += recipieIngredient.quantity * meal.servings / recipie.serves;
            break;
          }
        }

        if (found) {
          continue;
        }

        shoppingMap.set(ingredient.id, {
          id: 0,
          name: ingredient.name,
          category: ingredient.category,
          unitType: unit.type,
          quantity: recipieIngredient.quantity * meal.servings,
          got: false
        });
      }
    }

    for (const extra of extras) {
      const ingredient = await ingredientStore.get(extra.ingredient);
      if (!ingredient) {
        console.warn(`Ingredient ${extra.ingredient} not found for extra ${extra.id}`);
        continue;
      }

      const unit = await unitStore.get(extra.unit);
      if (!unit) {
        console.warn(`Unit ${extra.unit} not found for extra ${extra.id}`);
        continue;
      }

      let found = false;
      for (const [ recipieId, shoppingItem ] of shoppingMap) {
        if (recipieId === extra.ingredient && shoppingItem.unitType === unit.type) {
          found = true;
          shoppingItem.quantity += extra.quantity;
          break;
        }
      }

      if (found) {
        continue;
      }

      shoppingMap.set(ingredient.id, {
        id: 0,
        name: ingredient.name,
        category: ingredient.category,
        unitType: unit.type,
        quantity: extra.quantity,
        got: false
      });
    }

    setItems(Array.from(shoppingMap.values()));
  }

  return <Page title="List" showNav>
    {
      items.map((item) => {
        return <div key={item.id} style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1em",
          borderBottom: "1px solid #ccc"
        }}>
          <div>
            {item.name}
          </div>
          <div>
            {item.quantity} {item.unitType}
          </div>
        </div>;
      })
    }

    <Fab color="primary" sx={{
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }} onClick={() => setOpen(true)}>
      <Replay />
    </Fab>
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
