import { useNavigate, useParams } from "react-router-dom";
import { useItem } from "../../../hooks/useItem";
import { useCategories } from "../../../hooks/useCategories";
import { ItemKind, itemKindToString } from "../../../../models/items";
import { Form } from "../../../components/layout/form/form";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";
import { CourseType, courseTypeToString, DishType, dishTypeToString } from "../../../../models/meals";

export function ItemsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params.id ? parseInt(params.id, 10) : null;
  const isNew = params.id === undefined;

  const [item, setItem, saveItem] = useItem('items-edit-page', itemId);
  const [categories] = useCategories();

  async function handleSubmit() {
    await saveItem();
    navigate(-1);
  }

  const readymeal = item.readymeal || { servings: 1, time: 1, course: CourseType.Dinner, dish: DishType.Main };

  return <Form title={`Item: ${isNew ? "New" : item.name}`} onSubmit={handleSubmit}>
    <StringInput
      id="item-name-input"
      label="Item Name"
      value={item.name}
      onChange={(value) => setItem({ ...item, name: value })}
      lowercase
    />

    <ObjectSelect
      id="item-category-select"
      label="Item Category"
      value={item.category}
      onChange={(value) => setItem({ ...item, category: value || 0 })}
      options={categories.map(c => c.id)}
      toDisplay={(id: number) => categories.find(c => c.id === id)?.name || "Uncategorized"}
      onNew={() => navigate('/categories/new')}
    />

    <ObjectSelect
      id="item-kind-select"
      label="Item Kind"
      value={item.kind}
      onChange={(value) => setItem({ ...item, kind: value || ItemKind.Ingredient })}
      options={[ItemKind.Ingredient, ItemKind.Readymeal, ItemKind.Misc]}
      toDisplay={itemKindToString}
    />

    {item.kind === ItemKind.Readymeal && (
      <>
        <ObjectSelect
          id="item-course-select"
          label="Course Type"
          value={readymeal.course}
          onChange={(value) => setItem({ ...item, readymeal: { ...readymeal, course: value || CourseType.Dinner } })}
          options={[CourseType.Breakfast, CourseType.Lunch, CourseType.Dinner]}
          toDisplay={(course: CourseType) => courseTypeToString(course)}
        />

        <ObjectSelect
          id="item-dish-select"
          label="Dish Type"
          value={readymeal.dish}
          onChange={(value) => setItem({ ...item, readymeal: { ...readymeal, dish: value || DishType.Main } })}
          options={[DishType.Starter, DishType.Main, DishType.Side, DishType.Dessert]}
          toDisplay={(dish: DishType) => dishTypeToString(dish)}
        />

        <NumericInput
          id="item-servings-input"
          label="Servings"
          value={readymeal.servings}
          onChange={(value) => setItem({ ...item, readymeal: { ...readymeal, servings: value } })}
        />

        <NumericInput
          id="item-time-input"
          label="Time (mins)"
          value={readymeal.time}
          onChange={(value) => setItem({ ...item, readymeal: { ...readymeal, time: value } })}
        />
      </>
    )}
  </Form>;
}
