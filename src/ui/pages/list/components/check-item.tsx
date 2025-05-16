import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { CardActionArea, Typography } from "@mui/material";
import { ShoppingViewItem } from "../../../../services/shopping";
import { useState } from "react";

interface CheckItemProps {
  item: ShoppingViewItem;
  onCheck(): void;
  onContext(): void;
}

const DEBOUNCE_PERIOD = 500;
const LONG_PRESS_PERIOD = 1000;

export function CheckItem({ item, onCheck, onContext }: CheckItemProps) {
  const [debouncing, setDebouncing] = useState<boolean>(false);
  let touchStart: number = 0;

  function touchStartHandler() {
    if (touchStart) {
      clearTimeout(touchStart)
    }
    
    touchStart = setTimeout(() => {
      onContext();
    }, LONG_PRESS_PERIOD);
  }

  function touchEndHandler() {
    if (touchStart) {
      clearTimeout(touchStart)
      touchStart = 0;
    }
  }
  
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
          opacity: debouncing ? "40%" : "100%",
        }}
        onClick={clickHandler}
        onTouchStart={touchStartHandler}
        onTouchMove={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onTouchCancel={touchEndHandler}
        onContextMenu={(event) => {
          event.preventDefault();
          onContext();
        }}
        disableTouchRipple
        disabled={debouncing}
      >
        <Checkbox
          checked={item.got || item.pending}
          color="primary"
        />
        <Typography>{item.name}: {item.quantity}</Typography>
      </CardActionArea>
    </Card>
  )
}