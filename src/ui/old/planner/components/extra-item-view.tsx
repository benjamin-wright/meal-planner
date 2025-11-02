import { DetailView } from "../../../components/detail-view";
import { ExtraItem } from "./types";
import Box from "@mui/material/Box";
import { IconLink } from "../../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

interface StaticMealProps {
  extra: ExtraItem;
  onEdit: (extra: ExtraItem) => void;
  onDelete: (extra: ExtraItem) => void;
}

export function ExtraItemView({ extra, onEdit, onDelete }: StaticMealProps) {
  return (
    <DetailView id={`extra-${extra.id?.toString()}`} key={extra.id} title={extra.name} chip={extra.quantity} narrow horizontal>
      <Box display="flex" flexGrow="1">
        <IconLink onClick={() => onEdit(extra)}>
          <Edit />
        </IconLink>
        <IconLink
          color="error"
          onClick={() => onDelete(extra)}
        >
          <Delete />
        </IconLink>
      </Box>
    </DetailView>
  );
}
