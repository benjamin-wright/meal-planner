import { useLoaderData } from "react-router-dom";
import { Page } from "../../components/page";
import { RecipiesLoaderResult } from "./recipies-loader";
import { DetailView, DetailViewGroup } from "../../components/detail-view";
import { NewItemButton } from "../../components/new-item-button";

export function Recipies() {
  const data = useLoaderData() as RecipiesLoaderResult;

  return <Page title="Recipies">
    <DetailViewGroup>
      {
        data.recipies.map((recipie) => (
          <DetailView key={recipie.id} title={recipie.name} narrow>
            <div>
              <h2>{recipie.name}</h2>
              <p>{recipie.description}</p>
            </div>
          </DetailView>
        ))
      }
    </DetailViewGroup>
    <NewItemButton to="/recipies/new" />
  </Page>;
}
