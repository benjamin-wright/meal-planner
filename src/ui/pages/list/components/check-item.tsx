import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { ShoppingViewItem } from "./types";

interface CheckItemProps {
  item: ShoppingViewItem;
  onCheck(item: ShoppingViewItem): void;
}

export function CheckItem({ item, onCheck }: CheckItemProps) {
  return (
    <Card
      sx={{
        padding: "0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <Checkbox
        checked={item.got}
        onChange={() => onCheck(item)}
        color="primary"
      />
      <Typography>{item.name} - {item.quantity}</Typography>
    </Card>
  )
}