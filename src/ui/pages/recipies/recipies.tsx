import { useLoaderData, useNavigate } from "react-router-dom";
import { Page } from "../../components/page";
import { RecipiesLoaderResult } from "./recipies-loader";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { NewItemButton } from "../../components/new-item-button";
import { Paper, Typography } from "@mui/material";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { useState } from "react";
import { Recipie } from "../../../models/recipies";

export function Recipies() {
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Recipie | null>(null);
  const data = useLoaderData() as RecipiesLoaderResult;
  const navigate = useNavigate();

  function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    data.store.delete(toDelete.id);
    setOpen(false);
    data.recipies = data.recipies.filter((recipie) => recipie.id !== toDelete.id);
  }

  return <Page title="Recipies">
    <DetailViewGroup>
      {
        data.recipies.map((recipie) => (
          <DetailView
            key={recipie.id}
            title={recipie.name}
            onEdit={() => {
              navigate(`/recipies/${recipie.id}`);
            }}
            onDelete={() => {
              setToDelete(recipie);
              setOpen(true);
            }}
          >
            <Paper sx={{ padding: "0.75em" }}>
              <Typography variant="body1">Description: {recipie.description}</Typography>
              <Typography variant="body1">Serves: {recipie.serves}</Typography>
            </Paper>
          </DetailView>
        ))
      }
    </DetailViewGroup>
    <NewItemButton to="/recipies/new" />
    <ConfirmDialog
      message={`Deleting "${toDelete?.name}"`}
      open={isOpen}
      onConfirm={onDelete}
      onCancel={() => setOpen(false)}
    />
  </Page>;
}
