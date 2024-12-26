import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Page } from "../../components/page";
import { Ingredient } from "../../../models/ingredients";
import { Box } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IngredientsLoaderResult } from "./ingredients-loader";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { IconLink } from "../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

export function Ingredients() {
  const [toDelete, setToDelete] = useState<Ingredient | null>(null);
  const [isOpen, setOpen] = useState(false);
  const data = useLoaderData() as IngredientsLoaderResult;
  const navigate = useNavigate();

  function onEdit(ingredient: Ingredient) {
    navigate(`/ingredients/${ingredient.id}`);
  }

  function onDelete(ingredient: Ingredient) {
    setToDelete(ingredient);
    setOpen(true);
  }
  
  async function onConfirm() {
    if (toDelete?.id === undefined) {
      return;
    }
  
    await data.store.delete(toDelete.id);
    data.ingredients = data.ingredients.filter((i) => i.id !== toDelete.id);

    setToDelete(null);
    setOpen(false);
  }

  function onCancel() {
    setToDelete(null);
    setOpen(false);
  }

  function IngredientView({ ingredient }: { ingredient: Ingredient }) {
    return (
      <DetailView title={ingredient.name} horizontal narrow>
        <Box display="flex" flexGrow="1">
          <IconLink onClick={() => onEdit(ingredient)}>
            <Edit />
          </IconLink>
          <IconLink
            color="error"
            onClick={() => onDelete(ingredient)}
          >
            <Delete />
          </IconLink>
        </Box>
      </DetailView>
    )
  }

  return <Page title="Ingredients">
    <DetailViewGroup>
      { data.ingredients.map((ingredient) => (<IngredientView key={ingredient.id} ingredient={ingredient} />)) }
    </DetailViewGroup>
    <NewItemButton to="/ingredients/new" />
    <ConfirmDialog      
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  </Page>;
}
