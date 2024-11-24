import { useLoaderData } from "react-router-dom";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Category } from "../../database/schemas";

export function Categories() {
  const data = useLoaderData() as CategoriesLoaderResult;
  const items: UniqueIdentifier[] = data.categories.map((category: Category, index: number) => category.id || index);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  function handleDragEnd(event: any) {
    console.log(event);
  }

  return (
    <Page title="Categories">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <SortableContext items={items}>
          {(data.categories || []).map((category) => (
            <CategoryView key={category.id} category={category} />
          ))}
        </SortableContext>
      </DndContext>
    </Page>
  );
}
