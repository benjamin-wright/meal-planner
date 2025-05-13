import { Category } from "../models/categories";
import { CategoryStore } from "../persistence/interfaces/categories";

export async function reorderCategories(categories: Category[], store: CategoryStore): Promise<Category[]> {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].order === i) {
      continue;
    }

    categories[i].order = i;
    await store?.put(categories[i]);
  }

  return categories;
}