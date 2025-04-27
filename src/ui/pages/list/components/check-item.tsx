import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { CardActionArea, Typography } from "@mui/material";
import { ShoppingViewItem } from "./types";
import { useState } from "react";

interface CheckItemProps {
  item: ShoppingViewItem;
  onCheck(): void;
}

const DEBOUNCE_PERIOD = 500;

export function CheckItem({ item, onCheck }: CheckItemProps) {
  const [debouncing, setDebouncing] = useState<boolean>(false);
  
  function clickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setDebouncing(true);
    setTimeout(() => setDebouncing(false), DEBOUNCE_PERIOD)
    event.stopPropagation();
    onCheck();
  }

  return (
    <Card
      sx={{
        textAlign: "left",
        padding: "0.25em"
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          overflowX: "hidden",
          opacity: item.got ? "40%" : "100%"
        }}
        onClick={clickHandler}
        disableTouchRipple
        disabled={debouncing}
      >
        <Checkbox
          checked={item.got}
          color="primary"
        />
        <Typography>{item.name}: {item.quantity}</Typography>
      </CardActionArea>
    </Card>
  )
}