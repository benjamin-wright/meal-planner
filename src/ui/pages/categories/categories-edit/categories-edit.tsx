import { useNavigate, useParams } from "react-router-dom";
import { CategoriesEditView } from "./categories-edit-view";
import { useContext, useEffect, useState } from "react";
import { Category } from "../../../../models/categories";
import { DBContext } from "../../../providers/database";

export function CategoriesEdit() {
  const { stores } = useContext(DBContext);
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id ? parseInt(params.id, 10) : 0;
  const isNew = params.id === undefined;
  const [category, setCategory] = useState<Category>({
    id: categoryId,
    name: "",
    order: 0
  });

  useEffect(() => {
    if (!stores) return;

    (async () => {
      if (!isNew && categoryId) {
        const fetchedCategory = await stores.categoryStore.get(categoryId);
        if (fetchedCategory) {
          setCategory(fetchedCategory);
        }
        return
      }

      const fetchedCategories = await stores.categoryStore.getAll();
      setCategory({
        ...category,
        order: fetchedCategories.length
      });
    })();
  }, [stores]);

  function handleSave() {
    if (!stores) return;

    if (isNew) {
      stores.categoryStore.add(category.name, category.order);
    } else {
      stores.categoryStore.put(category);
    }

    navigate(-1);
  }
  
  return (
    <CategoriesEditView
      category={category}
      isNew={isNew}
      onUpdate={setCategory}
      onSave={handleSave}
    />
  );
}
