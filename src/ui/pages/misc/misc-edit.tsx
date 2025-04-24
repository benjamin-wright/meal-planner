import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { Category } from "../../../models/categories";
import { SelectID } from "../../components/select-id";
import { Ingredient } from "../../../models/ingredients";

export function MiscEdit() {
  const { ingredientStore, categoryStore } = useContext(DBContext);
  const { formsResult, returnTo, setFormResult, pushForm } = useForms("misc");
  const [isNew, setIsNew] = useState(true);
  const [ingredient, setIngredient] = useState<Ingredient>({ id: 0, name: "", category: 0, edible: false });
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();
  const params = useParams();

  async function load() {
    if (!ingredientStore || !categoryStore) {
      return;
    }

    const categories = await categoryStore.getAll();
    setCategories(categories);

    if (params.misc) {
      const ingredient = await ingredientStore.get(Number.parseInt(params.misc, 10));
      setIngredient(ingredient);
      setIsNew(false);
    } else {
      setIngredient({ id: 0, name: "", category: categories[0].id, edible: false });
    }

    if (formsResult) {
      const { form, response } = formsResult;
      const ingredient = form.body as Ingredient;

      if (response) {
        switch (response.field) {
          case "category":
            ingredient.category = response.response as number;
            break;
        }
      }

      setIngredient(ingredient);
    }
  }

  useEffect(() => {
    load();
  }, [ingredientStore, categoryStore, formsResult]);

  return (
    <Form
      title={isNew ? "Misc: new" : `Misc: ${ingredient.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        let id = ingredient.id;

        if (isNew) {
          id = await ingredientStore?.add(ingredient.name, ingredient.category, false) || 0;
        } else {
          await ingredientStore?.put(ingredient);
        }

        setFormResult("misc", { field: "misc", response: id });
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={ingredient.name}
        lowercase
        required
        onChange={(value) =>
          setIngredient({ ...ingredient, name: value })
        }
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
        onNav={() => {
          pushForm({
            to: "categories",
            from: "misc",
            link: location.pathname,
            body: ingredient
          })
        }}
      />

    </Form>
  );
}
