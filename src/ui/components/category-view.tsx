import { Box, Card, CardActionArea, Container, Typography } from "@mui/material";
import { Category } from "../../database/schemas/categories";
import { DetailView } from "./detail-view";
import { IconLink } from "./icon-link";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";


interface CategoryViewProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export function CategoryView({ category, onEdit, onDelete }: CategoryViewProps) {
  return (onEdit || onDelete) ? (
    <DetailView title={category.name} horizontal narrow>
      <Box display="flex" flexGrow="1">
        <IconLink onClick={() => onEdit && onEdit(category)}>
          <Edit />
        </IconLink>
        <IconLink
          color="error"
          onClick={() => onDelete && onDelete(category)}
        >
          <Delete />
        </IconLink>
      </Box>
    </DetailView>
  ) : (
    <Card
      sx={{
        padding: "1em",
        display: "flex",
      }}
    >
      <Typography variant="h2" fontSize="1em" flexGrow="1">
        {category.name}
      </Typography>
    </Card>
  );
}
