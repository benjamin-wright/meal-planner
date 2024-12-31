import { useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { NewItemButton } from "../../components/new-item-button";
import { Page } from "../../components/page";
import { Ingredient } from "../../../models/ingredients";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IngredientsLoaderResult } from "./ingredients-loader";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { IconLink } from "../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { ExpandMore } from "@mui/icons-material";

export function Ingredients() {
  const [toDelete, setToDelete] = useState<Ingredient | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | false>(false);
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
    // data.ingredients = data.ingredients.filter((i) => i.id !== toDelete.id);

    setToDelete(null);
    setOpen(false);
  }

  function onCancel() {
    setToDelete(null);
    setOpen(false);
  }

  return <Page title="Ingredients" sx={{ gap: 0 }}>
    <DetailViewGroup>
      { data.categories.map((category) => (
        <Accordion key={category.id} expanded={expanded === category.id} onChange={() => setExpanded(expanded === category.id ? false : category.id)}>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Typography>{category.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
              { data.ingredientsMap[category.id].map((ingredient) => (
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
              )) }
          </AccordionDetails>
        </Accordion>
      )) }
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
