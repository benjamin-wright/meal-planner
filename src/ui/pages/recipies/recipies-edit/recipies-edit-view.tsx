import { Form } from "../../../components/layout/form/form";
import { Recipe } from "../../../../models/recipies";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { CourseType, DishType } from "../../../../models/meals";
import { IngredientsList } from "./components/ingredients-list";
import { Unit } from "../../../../models/units";
import { Item } from "../../../../models/items";

type Props = {
  recipe: Recipe;
  items: Item[];
  units: Unit[];
  isNew: boolean;
  onSubmit: (recipe: Recipe) => void;
  onChange: (recipe: Recipe) => void;
  onNewIngredient: () => void;
}

export function RecipiesEditView({ recipe, items, units, isNew, onSubmit, onChange, onNewIngredient }: Props) {
  return <Form title={`Recipe: ${isNew ? "New" : recipe.name}`} onSubmit={() => onSubmit(recipe)}>
    <StringInput
      id="recipe-name-input"
      label="Name"
      value={recipe.name}
      onChange={(value) => onChange({ ...recipe, name: value })}
      lowercase
    />

    <StringInput
      id="recipe-description-input"
      label="Description"
      value={recipe.description || ""}
      onChange={(value) => onChange({ ...recipe, description: value })}
    />

    <NumericInput
      id="recipe-servings-input"
      label="Serves"
      value={recipe.serves}
      onChange={(value) => onChange({ ...recipe, serves: value })}
    />

    <NumericInput
      id="recipe-time-input"
      label="Time (minutes)"
      value={recipe.time}
      onChange={(value) => onChange({ ...recipe, time: value })}
    />

    <ObjectSelect
      id="recipe-course-input"
      label="Course"
      value={recipe.course}
      options={[
        CourseType.Breakfast,
        CourseType.Lunch,
        CourseType.Dinner
      ]}
      toDisplay={course => course.toString()}
      onChange={(value) => onChange({ ...recipe, course: value || CourseType.Dinner })}
    />

    <ObjectSelect
      id="recipe-dish-input"
      label="Dish"
      value={recipe.dish}
      options={[
        DishType.Main,
        DishType.Side,
        DishType.Dessert,
        DishType.Starter
      ]}
      toDisplay={dish => dish.toString()}
      onChange={(value) => onChange({ ...recipe, dish: value || DishType.Main })}
    />

    <IngredientsList
      ingredients={recipe.ingredients}
      items={items}
      units={units}
      newIngredient={onNewIngredient}
      onChange={(index, ingredient) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = ingredient;
        onChange({ ...recipe, ingredients: newIngredients });
      }}
    />
  </Form>;
}
