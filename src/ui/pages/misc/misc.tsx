import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/page";
import { DBContext } from "../../providers/database";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Category } from "../../../models/categories";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { Ingredient } from "../../../models/ingredients";

export function Misc() {
  const { ingredientStore, categoryStore } = useContext(DBContext);
  const [ingredients, setIngredients] = useState<Record<number, Ingredient[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<number | false>(false);
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState<Ingredient | null>(null);
  const [isOpen, setOpen] = useState(false);

  async function load() {
    if (!ingredientStore || !categoryStore) return;

    const ingredients = await ingredientStore.getInedible();
    const categories = await categoryStore.getAll();

    const grouped = ingredients.reduce((acc: { [key: number]: Ingredient[] }, item: Ingredient) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    setIngredients(grouped);
    setCategories(categories.filter((category) => ingredients.find((item) => item.category === category.id)).sort((a, b) => a.order - b.order));
  }

  function onEdit(item: Ingredient) {
    navigate(`/misc/${item.id}`);
  };

  function onDelete(item: Ingredient) {
    setToDelete(item);
    setOpen(true);
  }

  function onConfirm() {
    if (toDelete?.id === undefined) return;
    ingredientStore?.delete(toDelete.id);
    setOpen(false);
    setToDelete(null);

    const newIngredients = { ...ingredients };
    const categoryId = toDelete.category;
    newIngredients[categoryId] = newIngredients[categoryId].filter((item) => item.id !== toDelete.id);
    if (newIngredients[categoryId].length === 0) {
      delete newIngredients[categoryId];
      setCategories(categories.filter((category) => category.id !== categoryId));
    }

    setIngredients(newIngredients);
  }

  function onCancel() {
    setOpen(false);
    setToDelete(null);
  }

  useEffect(() => {
    load();
  }, [ingredientStore, categoryStore]);

  return <Page title="Misc" returnTo="/data" showNav sx={{ gap: 0 }}>
    <DetailViewGroup flexLayout bottomMargin="6em">
      {
        categories.map(category => (
          <Accordion key={category.id} expanded={expanded === category.id} onChange={() => setExpanded(expanded === category.id ? false : category.id)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {ingredients[category.id]?.map(item => (
                <DetailView horizontal narrow
                  key={item.id}
                  title={item.name}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)} 
                >
                </DetailView>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      }
    </ DetailViewGroup>
    <FloatingAddButton to="/misc/new" />
    <ConfirmDialog
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  </ Page>;
}
