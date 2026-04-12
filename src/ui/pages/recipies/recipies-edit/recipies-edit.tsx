import { useNavigate, useParams } from "react-router-dom";
import { useRecipe } from "../../../hooks/useRecipe";
import { Form } from "../../../components/layout/form/form";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { CourseType, DishType } from "../../../../models/meals";
import { IngredientsList } from "./components/ingredients-list";

export function RecipiesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const recipieId = params.id ? parseInt(params.id, 10) : null;
  const isNew = params.id === undefined;

  const [recipe, setRecipe, newIngredient, saveRecipe, units, items] = useRecipe('recipies-edit-page', recipieId);

  async function handleSubmit() {
    await saveRecipe();
    navigate(-1);
  }

  return <Form title={`Recipe: ${isNew ? "New" : recipe.name}`} onSubmit={handleSubmit}>
    <StringInput
      id="recipe-name-input"
      label="Name"
      value={recipe.name}
      onChange={(value) => setRecipe({ ...recipe, name: value })}
      lowercase
    />

    <StringInput
      id="recipe-description-input"
      label="Description"
      value={recipe.description || ""}
      onChange={(value) => setRecipe({ ...recipe, description: value })}
    />

    <NumericInput
      id="recipe-servings-input"
      label="Serves"
      value={recipe.serves}
      onChange={(value) => setRecipe({ ...recipe, serves: value })}
    />

    <NumericInput
      id="recipe-time-input"
      label="Time (minutes)"
      value={recipe.time}
      onChange={(value) => setRecipe({ ...recipe, time: value })}
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
      onChange={(value) => setRecipe({ ...recipe, course: value || CourseType.Dinner })}
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
      onChange={(value) => setRecipe({ ...recipe, dish: value || DishType.Main })}
    />

    <IngredientsList
      ingredients={recipe.ingredients}
      items={items}
      units={units}
      newIngredient={newIngredient}
      onChange={(index, ingredient) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = ingredient;
        setRecipe({ ...recipe, ingredients: newIngredients });
      }}
    />
  </Form>;
}
