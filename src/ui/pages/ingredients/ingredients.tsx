import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Page } from "../../components/page";
import { Ingredient } from "../../../models/ingredients";
import { Category } from "../../../models/categories";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { ExpandMore } from "@mui/icons-material";
import { DBContext } from "../../providers/database";

export function Ingredients() {
  const { categoryStore, ingredientStore } = useContext(DBContext);
  const [ingredients, setIngredients] = useState<Record<number, Ingredient[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [toDelete, setToDelete] = useState<Ingredient | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | false>(false);
  const navigate = useNavigate();

  async function load() {
    if (!categoryStore || !ingredientStore) {
      return;
    }

    const ingredients = await ingredientStore.getAll();
    setIngredients(ingredients.reduce((acc, ingredient) => {
      if (!acc[ingredient.category]) {
        acc[ingredient.category] = [];
      }

      acc[ingredient.category].push(ingredient);
      return acc;
    }, {} as Record<number, Ingredient[]>));

    let categories = await categoryStore.getAll();
    categories = categories.filter((category) => ingredients.find((ingredient) => ingredient.category === category.id)).sort((a, b) => a.order - b.order);
    setCategories(categories);
  }

  useEffect(() => {
    load();
  }, [categoryStore, ingredientStore]);

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
  
    await ingredientStore?.delete(toDelete.id);

    setToDelete(null);
    setOpen(false);
    setIngredients({...ingredients, [toDelete.category]: ingredients[toDelete.category].filter((ingredient) => ingredient.id !== toDelete.id)});
  }

  function onCancel() {
    setToDelete(null);
    setOpen(false);
  }

  return <Page title="Ingredients" returnTo="/data" showNav sx={{ gap: 0 }}>
    <DetailViewGroup>
      { categories.map((category) => (
        <Accordion key={category.id} expanded={expanded === category.id} onChange={() => setExpanded(expanded === category.id ? false : category.id)}>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Typography>{category.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
              { ingredients[category.id]?.map((ingredient) => (
                <DetailView horizontal narrow
                  key={ingredient.id}
                  title={ingredient.name}
                  onEdit={() => onEdit(ingredient)}
                  onDelete={() => onDelete(ingredient)}
                >
                </DetailView>
              )) }
          </AccordionDetails>
        </Accordion>
      )) }
    </DetailViewGroup>
    <FloatingAddButton to="/ingredients/new" />
    <ConfirmDialog      
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  </Page>;
}
