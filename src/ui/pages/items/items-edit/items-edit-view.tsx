import { Item, ItemKind, itemKindToString } from "../../../../models/items";

import "./items-edit-view.css"
import { Form } from "../../../components/layout/form/form";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { Category } from "../../../../models/categories";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";
import { CourseType, courseTypeToString, DishType, dishTypeToString } from "../../../../models/meals";

type Props = {
  item: Item;
  isNew: boolean;
  categories: Category[];
  onChange: (item: Item) => void;
  onSubmit: (item: Item) => void;
}

export function ItemsEditView({ item, isNew, categories, onChange, onSubmit }: Props) {
  const readymeal = item.readymeal || { servings: 1, time: 1, course: CourseType.Dinner, dish: DishType.Main };

  return <Form title={`Item: ${isNew ? "New" : item.name}`} onSubmit={() => onSubmit(item)}>
    <StringInput
      id="item-name-input"
      label="Item Name"
      value={item.name}
      onChange={(value) => onChange({ ...item, name: value })}
      lowercase
    />

    <ObjectSelect
      id="item-category-select"
      label="Item Category"
      value={item.category}
      onChange={(value) => onChange({ ...item, category: value || 0 })}
      options={categories.map(c => c.id)}
      toDisplay={(id: number) => categories.find(c => c.id === id)?.name || "Uncategorized"}
    />

    <ObjectSelect
      id="item-kind-select"
      label="Item Kind"
      value={item.kind}
      onChange={(value) => onChange({ ...item, kind: value || ItemKind.Ingredient })}
      options={[ ItemKind.Ingredient, ItemKind.Readymeal, ItemKind.Misc ]}
      toDisplay={itemKindToString}
    />

    {item.kind === ItemKind.Readymeal && (
      <>
        <ObjectSelect
          id="item-course-select"
          label="Course Type"
          value={readymeal.course}
          onChange={(value) => onChange({ ...item, readymeal: { ...readymeal, course: value || CourseType.Dinner } })}
          options={[ CourseType.Breakfast, CourseType.Lunch, CourseType.Dinner ]}
          toDisplay={(course: CourseType) => courseTypeToString(course)}
        />

        <ObjectSelect
          id="item-dish-select"
          label="Dish Type"
          value={readymeal.dish}
          onChange={(value) => onChange({ ...item, readymeal: { ...readymeal, dish: value || DishType.Main } })}
          options={[ DishType.Starter, DishType.Main, DishType.Side, DishType.Dessert ]}
          toDisplay={(dish: DishType) => dishTypeToString(dish)}
        />

        <NumericInput
          id="item-servings-input"
          label="Servings"
          value={readymeal.servings}
          onChange={(value) => onChange({ ...item, readymeal: { ...readymeal, servings: value } })}
        />

        <NumericInput
          id="item-time-input"
          label="Time (mins)"
          value={readymeal.time}
          onChange={(value) => onChange({ ...item, readymeal: { ...readymeal, time: value } })}
        />
      </>
    )}
  </Form>;
}
