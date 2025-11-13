import { ItemKind } from "../../../../models/items";
import { ItemsEditView } from "./items-edit-view";

export function ItemsEdit() {
  return <ItemsEditView
    item={{ id: 1, name: "Sample Item", category: 1, kind: ItemKind.Ingredient }}
    onChange={() => { }}
  />;
}
