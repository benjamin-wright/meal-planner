import { useNavigate } from "react-router-dom";
import { Page } from "../../components/page";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Paper, Typography } from "@mui/material";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { useContext, useEffect, useState } from "react";
import { Recipie } from "../../../models/recipies";
import { DBContext } from "../../providers/database";

export function Recipies() {
  const { recipieStore } = useContext(DBContext);
  const [recipies, setRecipies] = useState<Recipie[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Recipie | null>(null);
  const navigate = useNavigate();

  async function load() {
    if (!recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
    setRecipies(recipies);
  }

  useEffect(() => {
    load();
  }, [recipieStore]);

  function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    recipieStore?.delete(toDelete.id);
    setOpen(false);
    setRecipies(recipies.filter((recipie) => recipie.id !== toDelete.id));
  }

  return <Page title="Recipies">
    <DetailViewGroup>
      {
        recipies.map((recipie) => (
          <DetailView
            key={recipie.id}
            title={recipie.name}
            onEdit={() => {
              navigate(`/recipies/${recipie.id}/metadata`);
            }}
            onDelete={() => {
              setToDelete(recipie);
              setOpen(true);
            }}
          >
            <Paper sx={{ padding: "0.75em" }}>
              <Typography variant="body1">{recipie.description}</Typography>
              <Typography variant="body2">Time: {recipie.time || "0"} mins</Typography>
            </Paper>
          </DetailView>
        ))
      }
    </DetailViewGroup>
    <FloatingAddButton to="/recipies/new/metadata" />
    <ConfirmDialog
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onDelete}
      onCancel={() => setOpen(false)}
    />
  </Page>;
}
