import { Box } from "@mui/material";
import { CheckItem } from "./check-item";
import { ShoppingViewItem } from "./types";

interface ListViewProps {
  items: ShoppingViewItem[];
  categories: string[];
  onCheck(item: ShoppingViewItem): void;
}

export function ListView({ items, onCheck }: ListViewProps) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5em">
      {items.map((item) => (
        <CheckItem
          key={item.id}
          item={item}
          onCheck={onCheck}
        />
      ))}
    </Box>
  );
}