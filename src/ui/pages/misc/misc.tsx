import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/page";
import { DBContext } from "../../providers/database";
import { Misc as model } from "../../../models/misc";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Category } from "../../../models/categories";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { IconLink } from "../../components/icon-link";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/confirm-dialog";

export function Misc() {
  const { miscStore, categoryStore } = useContext(DBContext);
  const [misc, setMisc] = useState<Record<number, model[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<number | false>(false);
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState<model | null>(null);
  const [isOpen, setOpen] = useState(false);

  async function load() {
    if (!miscStore || !categoryStore) return;

    const misc = await miscStore.getAll();
    const categories = await categoryStore.getAll();

    const grouped = misc.reduce((acc: { [key: number]: model[] }, item: model) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    setMisc(grouped);
    setCategories(categories.filter((category) => misc.find((item) => item.category === category.id)).sort((a, b) => a.order - b.order));
  }

  function onEdit(item: model) {
    navigate(`/misc/${item.id}`);
  };

  function onDelete(item: model) {
    setToDelete(item);
    setOpen(true);
  }

  function onConfirm() {
    if (toDelete?.id === undefined) return;
    miscStore?.delete(toDelete.id);
    setOpen(false);
    setToDelete(null);

    const newMisc = { ...misc };
    const categoryId = toDelete.category;
    newMisc[categoryId] = newMisc[categoryId].filter((item) => item.id !== toDelete.id);
    if (newMisc[categoryId].length === 0) {
      delete newMisc[categoryId];
      setCategories(categories.filter((category) => category.id !== categoryId));
    }

    setMisc(newMisc);
  }

  function onCancel() {
    setOpen(false);
    setToDelete(null);
  }

  useEffect(() => {
    load();
  }, [miscStore, categoryStore]);

  return <Page title="Misc" returnTo="/data" showNav sx={{ gap: 0 }}>
    <DetailViewGroup>
      {
        categories.map(category => (
          <Accordion key={category.id} expanded={expanded === category.id} onChange={() => setExpanded(expanded === category.id ? false : category.id)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {misc[category.id]?.map(item => (
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
