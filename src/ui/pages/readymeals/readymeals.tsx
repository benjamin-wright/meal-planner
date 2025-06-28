import { useNavigate } from "react-router-dom";
import { Page } from "../../components/page";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { FloatingAddButton } from "../../components/floating-add-button";
import { Paper, Typography, Tabs, Tab } from "@mui/material";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { MealType } from "../../../models/meals";
import { ReadyMeal } from "../../../models/readymeals";
import { Category } from "../../../models/categories";

function useReadymeals() {
  const { categoryStore, readymealStore } = useContext(DBContext);
  const [readymeals, setReadymeals] = useState<ReadyMeal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    if (!readymealStore || !categoryStore) {
      return;
    }

    (async () => {
      const readymeals = await readymealStore.getAll();
      setReadymeals(readymeals);

      const categories = await categoryStore.getAll();
      setCategories(categories);
    })();
    
  }, [readymealStore]);

  function deleteReadymeal(readymeal: ReadyMeal): Promise<void> | undefined {
    setReadymeals(readymeals.filter((r) => r.id !== readymeal.id));
    return readymealStore?.delete(readymeal.id);
  }

  return { readymeals, categories, deleteReadymeal };
}


export function ReadyMeals() {
  const { readymeals, categories, deleteReadymeal } = useReadymeals();
  const [toDelete, setToDelete] = useState<ReadyMeal | undefined>();
  const [mealType, setMealType] = useState<MealType | "all">("all");
  const navigate = useNavigate();

  async function onDelete(item: ReadyMeal) {
    await deleteReadymeal(item);
    setToDelete(undefined);
  }

  return <Page title="Ready Meals" returnTo="/data" showNav>
    <Tabs
      value={mealType}
      onChange={(_, value) => setMealType(value)}
      variant="fullWidth"
    >
      <Tab label="All" value="all" sx={{ textTransform: "uppercase" }} />
      {Object.values(MealType).map(type => (
        <Tab key={type} label={type} value={type} sx={{ textTransform: "uppercase" }} />
      ))}
    </Tabs>
    <DetailViewGroup flexLayout bottomMargin="6em">
      {
        readymeals
          .filter((readymeal) => mealType === "all" || readymeal.meal === mealType)
          .map((readymeal) => {
            const category = categories.find(c => c.id === readymeal.category)?.name || "Uncategorized";

            return (
              <DetailView
                key={readymeal.id}
                title={readymeal.name}
                onEdit={() => {
                  navigate(`/readymeals/${readymeal.id}`);
                }}
                onDelete={() => {
                  setToDelete(readymeal);
                }}
              >
                <Paper sx={{ padding: "0.75em" }}>
                  <Typography variant="body2">Time: {readymeal.time || "0"} mins, Serves: { readymeal.serves }</Typography>
                  <Typography variant="caption" color="text.secondary">{readymeal.meal} - {category}</Typography>
                </Paper>
              </DetailView>
            )
          })
      }
    </DetailViewGroup>
    <FloatingAddButton to="/readymeals/new" />
    <ConfirmDialog
      message={`Deleting "${toDelete?.name}"`}
      item={toDelete}
      onConfirm={onDelete}
      onCancel={() => setToDelete(undefined)}
    />
  </Page>;
}
