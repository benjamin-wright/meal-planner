import { Item } from "../../../../models/items";

import "./items-edit-view.css"
import { Form } from "../../../components/layout/form/form";
import { StringInput } from "../../../components/inputs/string-input/string-input";

type Props = {
  item: Item;
  onChange: (item: Item) => void;
}

export function ItemsEditView({ item, onChange }: Props) {
  return <Form title="Items Edit" onSubmit={() => { }}>
    <StringInput
      id="item-name-input"
      label="Item Name"
      value={item.name}
      onChange={(value) => onChange({ ...item, name: value })}
      lowercase
    />
  </Form>;
}
