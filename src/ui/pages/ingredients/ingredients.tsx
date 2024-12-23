import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Page } from "../../components/page";
import { Ingredient } from "../../../database/schemas/ingredients";

export function Ingredients() {
  const [toDelete, setToDelete] = useState<Ingredient | null>(null);
  const [isOpen, setOpen] = useState(false);

  function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    // await database.ingredients.delete(toDelete.id);
    setOpen(false);
  }

  return <Page title="Ingredients">
    <NewItemButton to="/ingredients/new" />
    <ConfirmDialog      
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onDelete}
      onCancel={() => setOpen(false)}
    />
  </Page>;
}
