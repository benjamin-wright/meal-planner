import { useLoaderData } from "react-router-dom";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
export function Categories() {
  const data = useLoaderData() as CategoriesLoaderResult;

  return (
    <Page title="Categories">
      <DndProvider backend={TouchBackend}>
        {(data.categories || []).map((category) => (
          <CategoryView key={category.id} category={category} />
        ))}
      </DndProvider>
    </Page>
  );
}
