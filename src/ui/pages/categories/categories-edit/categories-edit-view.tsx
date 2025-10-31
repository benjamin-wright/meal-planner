import { Category, validate } from "../../../../models/categories";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";

type Props = {
  category: Category,
  isNew: boolean,
  onUpdate: (category: Category) => void
  onSave: () => void
}

export function CategoriesEditView({ category, isNew, onUpdate, onSave }: Props) {
  return (
    <Form title={isNew ? "New Category" : `Edit Category`} onSubmit={onSave} disableSubmit={!validate(category)}>
      <StringInput
        id="category-name-input"
        label="Category Name"
        value={category.name}
        onChange={(value) => onUpdate({ ...category, name: value })}
        lowercase
      />
    </Form>
  );
}