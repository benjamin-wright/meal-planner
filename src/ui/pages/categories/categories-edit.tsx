import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { Category } from "../../../models/categories";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { FormContext } from "../../providers/forms";

export function CategoriesEdit() {
  const { categoryStore } = useContext(DBContext);
  const forms = useContext(FormContext);
  const [isNew, setIsNew] = useState(true);
  const [category, setCategory] = useState<Category>({ id: 0, name: "", order: 0 });
  const navigate = useNavigate();
  const params = useParams();
  const returnTo = forms.getReturn("categories", "/categories");

  async function load() {
    if (categoryStore === undefined) {
      return;
    }

    if (params.category) {
      const category = await categoryStore.get(Number.parseInt(params.category, 10));
      setCategory(category);
      setIsNew(false);
    } else {
      const categories = await categoryStore.getAll();
      setCategory({ id: 0, name: "", order: categories.length });
    }
  }
  
  useEffect(() => {
    load();
  }, [categoryStore]);

  return (
    <Form
      title={isNew ? "Categories: new" : `Categories: ${category.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        let id = category.id;

        if (isNew) {
          id = await categoryStore?.add(category.name, category.order) || 0;
        } else {
          await categoryStore?.put(category);
        }

        forms.setResult("categories", { field: "category", response: id });
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={category.name}
        lowercase
        required
        onChange={(value) =>
          setCategory({ ...category, name: value })
        }
      />
    </Form>
  );
}
