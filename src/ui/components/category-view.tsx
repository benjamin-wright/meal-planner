import Box from "@mui/material/Box";
import { Category } from "../../database/schemas/categories";
import { DetailView } from "./detail-view";
import { IconLink } from "./icon-link";
import { DragControls } from "motion/react";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import React from "react";

interface CategoryViewProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  dragControls?: DragControls;
  working?: boolean;
}

export function CategoryView({ category, onEdit, onDelete, dragControls, working }: CategoryViewProps) {
  return (
    <DetailView title={category.name} horizontal narrow dragControls={dragControls} working={working}>
      <Box display="flex" flexGrow="1">
        <IconLink onClick={(event: React.MouseEvent<HTMLButtonElement>) => onEdit && onEdit(category)} disabled={working}>
          <Edit />
        </IconLink>
        <IconLink
          color="error"
          onClick={() => onDelete && onDelete(category)}
          disabled={working}
        >
          <Delete />
        </IconLink>
      </Box>
    </DetailView>
  )
}
