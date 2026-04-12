import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { Reorder } from "framer-motion";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { IconButton } from "../../../components/inputs/icon-button/icon-button";
import DragHandle from "../../../components/icons/drag-handle";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { Dialog } from "../../../components/containers/dialog/dialog";

import './categories.css'

export function Categories() {
  const navigate = useNavigate();
  const [categories, reorderCategories, deleteCategory] = useCategories();

  const [sorting, setSorting] = useState(false);
  const [toDelete, setToDelete] = useState<Category | undefined>(undefined);

  function sortingView() {
    return (
      <Reorder.Group axis="y" values={categories} onReorder={reorderCategories} className="categories-list" sx={{ overflowY: 'scroll' }}>
        {
          categories.map((category) => (
            <Reorder.Item
              key={category.id}
              value={category}
              className="category-item category-item-sortable glazing"
              style={{ touchAction: 'none' }}
              aria-label={`Category list item for ${category.name}`}
            >
              <IconButton icon={<DragHandle />} />
              <span>{category.name}</span>
            </Reorder.Item>
          ))
        }
      </Reorder.Group>
    );
  }

  function fixedView() {
    return (
      <SlideOutGroup>
        {
          categories.length === 0 ? (<></>) :
            categories.map((category) => (
              <SlideOutControl
                key={category.name}
                groupId={category.name}
                label={`Category list item for ${category.name}`}
                onEdit={() => navigate(`/categories/${category.id}`)}
                onDelete={() => setToDelete(category)}
              >
                {category.name}
              </SlideOutControl>
            ))
        }
      </SlideOutGroup>
    );
  }

  return (
    <Page title="Categories" onSorting={(sorting: boolean) => {
      setSorting(sorting);
    }}>
      {sorting ? sortingView() : fixedView()}
      <AddButton id="add-category-button" onClick={() => navigate('/categories/new')} disabled={sorting} />
      <Dialog
        isOpen={!!toDelete}
        prompt="Are you sure you want to delete this category?"
        warning="This action cannot be undone."
        onClose={(accept: boolean) => {
          if (accept && toDelete) {
            deleteCategory(toDelete);
          }

          setToDelete(undefined);
        }}
      />
    </Page>
  );
}
