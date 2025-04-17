import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { SelectID } from "../../components/select-id";
import { Category } from "../../../models/categories";
import { Ingredient } from "../../../models/ingredients";
import { TextInput } from "../../components/text-input";
import { useForms } from "../../providers/forms";
import { DBContext } from "../../providers/database";
import { Unit, UnitType } from "../../../models/units";

export function IngredientsEdit() {
  const { formsResult, pushForm, returnTo, setFormResult } = useForms("ingredients");
  const { ingredientStore, categoryStore, unitStore } = useContext(DBContext);
  const params = useParams();

  const [ingredient, setIngredient] = useState<Ingredient>({ id: 0, name: "", category: 0, unitType: UnitType.Weight, unit: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  async function load() {
    if (!ingredientStore || !categoryStore || !unitStore) {
      return;
    }
    
    if (params.ingredient) {
      const ingredient = await ingredientStore.get(Number.parseInt(params.ingredient, 10));
      setIngredient(ingredient);
      setIsNew(false);
    }

    const categories = await categoryStore.getAll();
    setCategories(categories);

    const units = await unitStore.getAll();
    setUnits(units);
  
    if (formsResult) {
      const { form, response } = formsResult;
      const ingredient = form.body as Ingredient;

      if (response) {
        switch (response.field) {
          case "category":
            ingredient.category = response.response as number;
            break;
          case "unit":
            ingredient.unit = response.response as number;
            break;
        }
      }

      setIngredient(ingredient);
    }
  }

  useEffect(() => {
    load();
  }, [ingredientStore, categoryStore, unitStore, formsResult]);

  function validate() {
    return ingredient.name !== "";
  }

  return (
    <Form
      title={isNew ? "Ingredients: new" : `Ingredients: ${ingredient.name}`}
      returnTo={returnTo}
      disabled={!validate()}
      onSubmit={async () => {
        let id = ingredient.id;
        console.info("ingredient", ingredient);
        if (isNew) {
          id = await ingredientStore?.add(ingredient.name, ingredient.category, ingredient.unitType, ingredient.unit) || 0;
        } else {
          await ingredientStore?.put(ingredient);
        }
        
        setFormResult("ingredients", { field: "ingredient", response: id });
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={ingredient.name}
        required
        lowercase
        onChange={(value) => setIngredient({ ...ingredient, name: value })}
      />

      <SelectID
        value={ingredient.category}
        items={categories}
        id="category"
        label="category"
        link="/categories/new"
        required
        toLabel={(category: Category) => category.name}
        onChange={(id: number) => setIngredient({ ...ingredient, category: id })}
        onNav={() => { pushForm({
          to: "categories",
          from: "ingredients",
          link: location.pathname,
          body: ingredient
        })}}
      />

      <SelectID
        value={ingredient.unit}
        items={units}
        id="unit"
        label="unit"
        link="/units/new"
        required
        toLabel={(unit) => unit.name}
        onChange={(id: number) => setIngredient({ ...ingredient, unit: id })}
        onNav={() => {
          pushForm({
            to: "units",
            from: "ingredients",
            link: location.pathname,
            body: ingredient
          })
        }}
      />
    </Form>
  );
}
