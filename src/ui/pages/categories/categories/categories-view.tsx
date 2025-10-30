import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";

type Props = {
  categories: Category[];
};

export function CategoriesView({ categories }: Props) {
  return (
    <Page title="Categories">
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </Page>
  );
}
