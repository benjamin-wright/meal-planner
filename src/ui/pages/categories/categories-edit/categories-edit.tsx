import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../../hooks/useCategory";
import { validate } from "../../../../models/categories";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";

export function CategoriesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id ? parseInt(params.id, 10) : 0;
  const isNew = params.id === undefined;

  const [category, setCategory, save] = useCategory("categories-edit-page", categoryId);

  async function handleSave() {
    await save();
    navigate(-1);
  }

  return (
    <Form title={isNew ? "New Category" : `Edit Category`} onSubmit={handleSave} disableSubmit={!validate(category)}>
      <StringInput
        id="category-name-input"
        label="Category Name"
        value={category.name}
        onChange={(value: string) => setCategory({ ...category, name: value })}
        lowercase
      />
    </Form>
  );
}
