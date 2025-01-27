import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { TextInput } from "../../components/text-input";
import { Recipie } from "../../../models/recipies";
import { NumericInput } from "../../components/numeric-input";
import { DBContext } from "../../providers/database";

export function RecipiesMetadata() {
  const { recipieStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const navigate = useNavigate();

  async function load() {
    if (!recipieStore) {
      return;
    }
    
    if (params.recipie) {
      const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
      
      setRecipie(recipie);
      setIsNew(false);
    }
  }

  useEffect(() => {
    load();
  }, [recipieStore]);

  function validate() {
    return recipie.name !== "";
  }

  return (
    <Form
      title={isNew ? "Recipies: new" : `Recipies: ${recipie.name}`}
      returnTo="/recipies"
      disabled={!validate()}
      morePages
      onSubmit={async () => {
        if (isNew) {
          recipie.id = await recipieStore?.add(recipie.name, recipie.description, recipie.serves, recipie.time, recipie.ingredients, recipie.steps) || 0;
        } else {
          await recipieStore?.put(recipie);
        }
        navigate(`/recipies/${recipie.id}/ingredients`);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={recipie.name}
        required
        lowercase
        onChange={(value) => setRecipie({ ...recipie, name: value })}
      />

      <TextInput
        id="description"
        variant="outlined"
        label="description"
        value={recipie.description}
        onChange={(value) => setRecipie({ ...recipie, description: value })}
      />

      <NumericInput
        id="serves"
        label="serves"
        value={recipie.serves}
        required
        onChange={(value) => setRecipie({ ...recipie, serves: value })}
      />

      <NumericInput
        id="time"
        label="time (mins)"
        value={recipie.time}
        required
        onChange={(value) => setRecipie({ ...recipie, time: value })}
      />
    </Form>
  );
}
