import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { Misc as model } from "../../../models/misc";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { Category } from "../../../models/categories";
import { SelectID } from "../../components/select-id";

export function MiscEdit() {
  const { miscStore, categoryStore } = useContext(DBContext);
  const { formsResult, returnTo, setFormResult, pushForm } = useForms("misc");
  const [isNew, setIsNew] = useState(true);
  const [misc, setMisc] = useState<model>({ id: 0, name: "", category: 0 });
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();
  const params = useParams();

  async function load() {
    if (!miscStore || !categoryStore) {
      return;
    }

    const categories = await categoryStore.getAll();
    setCategories(categories);

    if (params.misc) {
      const misc = await miscStore.get(Number.parseInt(params.misc, 10));
      setMisc(misc);
      setIsNew(false);
    } else {
      setMisc({ id: 0, name: "", category: categories[0].id });
    }

    if (formsResult) {
      const { form, response } = formsResult;
      const misc = form.body as model;

      if (response) {
        switch (response.field) {
          case "category":
            misc.category = response.response as number;
            break;
        }
      }

      setMisc(misc);
    }
  }
  
  useEffect(() => {
    load();
  }, [miscStore, categoryStore, formsResult]);

  return (
    <Form
      title={isNew ? "Misc: new" : `Misc: ${misc.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        let id = misc.id;

        if (isNew) {
          id = await miscStore?.add(misc.name, misc.category) || 0;
        } else {
          await miscStore?.put(misc);
        }

        setFormResult("misc", { field: "misc", response: id });
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={misc.name}
        lowercase
        required
        onChange={(value) =>
          setMisc({ ...misc, name: value })
        }
      />

      <SelectID
        value={misc.category}
        items={categories}
        id="category"
        label="category"
        link="/categories/new"
        required
        toLabel={(category: Category) => category.name}
        onChange={(id: number) => setMisc({ ...misc, category: id })}
        onNav={() => { pushForm({
          to: "categories",
          from: "misc",
          link: location.pathname,
          body: misc
        })}}
      />

    </Form>
  );
}
