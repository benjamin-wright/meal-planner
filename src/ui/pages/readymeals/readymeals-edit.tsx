import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { SelectID } from "../../components/select-id";
import { Category } from "../../../models/categories";
import { TextInput } from "../../components/text-input";
import { useForms } from "../../providers/forms";
import { DBContext } from "../../providers/database";
import { ReadyMeal } from "../../../models/readymeals";
import { MealType } from "../../../models/meals";
import { NumericInput } from "../../components/numeric-input";
import Box from "@mui/material/Box";
import { SelectString } from "../../components/select-string";

export function ReadyMealsEdit() {
  const { formsResult, pushForm, returnTo, setFormResult } = useForms("readymeals");
  const { categoryStore, readymealStore } = useContext(DBContext);
  const params = useParams();

  const [readymeal, setReadymeal] = useState<ReadyMeal>({ id: 0, name: "", serves: 0, time: 0, meal: MealType.Dinner, category: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();

  async function load() {
    if (!readymealStore || !categoryStore) {
      return;
    }
    
    if (params.readymeal) {
      const readymeal = await readymealStore.get(Number.parseInt(params.readymeal, 10));
      setReadymeal(readymeal);
      setIsNew(false);
    }

    const categories = await categoryStore.getAll();
    setCategories(categories);
  
    if (formsResult) {
      const { form, response } = formsResult;
      const readymeal = form.body as ReadyMeal;

      if (response) {
        switch (response.field) {
          case "category":
            readymeal.category = response.response as number;
            break;
        }
      }

      setReadymeal(readymeal);
    }
  }

  useEffect(() => {
    load();
  }, [readymealStore, categoryStore, formsResult]);

  function validate() {
    return readymeal.name !== "" && readymeal.category !== 0;
  }

  return (
    <Form
      title={isNew ? "Ready Meals: new" : `Ready Meals: ${readymeal.name}`}
      returnTo={returnTo}
      disabled={!validate()}
      onSubmit={async () => {
        let id = readymeal.id;
        if (isNew) {
          id = await readymealStore?.add(readymeal.name, readymeal.serves, readymeal.time, readymeal.meal, readymeal.category) || 0;
        } else {
          await readymealStore?.put(readymeal);
        }
        
        setFormResult("readymeals", { field: "ingredient", response: id });
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={readymeal.name}
        required
        lowercase
        onChange={(value) => setReadymeal({ ...readymeal, name: value })}
      />

      <Box display="flex" flexDirection="row" gap="1em" justifyContent={"space-between"}>
        <NumericInput
          id="serves"
          label="serves"
          value={readymeal.serves}
          required
          onChange={(value) => setReadymeal({ ...readymeal, serves: value })}
        />

        <NumericInput
          id="time"
          label="time (mins)"
          value={readymeal.time}
          required
          onChange={(value) => setReadymeal({ ...readymeal, time: value })}
        />
      </Box>

      <SelectString
        id="meal"
        label="meal"
        value={readymeal.meal}
        options={Object.values(MealType)}
        required
        capitalise
        onChange={meal => setReadymeal({ ...readymeal, meal: meal as MealType })}
      />

      <SelectID
        value={readymeal.category}
        items={categories}
        id="category"
        label="category"
        link="/categories/new"
        required
        toLabel={(category: Category) => category.name}
        onChange={(id: number) => setReadymeal({ ...readymeal, category: id })}
        onNav={() => { pushForm({
          to: "categories",
          from: "readymeals",
          link: location.pathname,
          body: readymeal
        })}}
      />
    </Form>
  );
}
