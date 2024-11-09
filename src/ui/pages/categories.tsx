import { useLoaderData } from "react-router-dom";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";

export function Categories() {
  const data = useLoaderData() as CategoriesLoaderResult;

  return (
    <Page title="Categories">
      {(data.categories || []).map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </Page>
  );
}
