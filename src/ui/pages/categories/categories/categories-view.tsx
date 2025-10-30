import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { CategoriesList } from "./components/categories-list";

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
};

export function CategoriesView({ categories, onReorder }: Props) {
  return (
    <Page title="Categories">
      <CategoriesList categories={categories} onReorder={onReorder} />
    </Page>
  );
}
