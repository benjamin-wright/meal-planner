import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { CardActionArea, LinearProgress, Typography } from "@mui/material";
import { ShoppingViewItem } from "../../../../services/shopping";
import { useEffect, useState } from "react";

interface CheckItemProps {
  item: ShoppingViewItem;
  startTimestamp?: number;
  endTimestamp?: number;
  onCheck(): void;
  onContext(): void;
}

const DEBOUNCE_PERIOD = 500;

let count = 0;

type ProgressTimer = {
  cancel: () => void;
  progress: number;
  index: number;
}

export function CheckItem({ item, startTimestamp, endTimestamp, onCheck, onContext }: CheckItemProps) {
  const [debouncing, setDebouncing] = useState<boolean>(false);
  const [timer, setTimer] = useState<ProgressTimer | null>(null);

  useEffect(() => {
    count++;
    
    if (timer) {
      timer.cancel();
      setTimer(null);
    }

    if (!startTimestamp || !endTimestamp || endTimestamp < Date.now()) {
      console.info(`CheckItem [${count}: ${item.name}]: No active animation, resetting state`);
      return;
    }
    
    let running = true;
    const handle = setInterval(() => {
      if (!running) {
        clearInterval(handle);
        return;
      }

      if (!startTimestamp || !endTimestamp || endTimestamp < Date.now()) {
        clearInterval(handle);
        return;
      }

      const duration = endTimestamp - startTimestamp;
      const now = Date.now();
      const elapsed = now - startTimestamp;
      const progressValue = Math.min(100, (elapsed / duration) * 100) + 100 / 10; // Add a small offset to account for animation lag
      setTimer(timer => {
        if (!timer) {
          return null;
        }

        return {
          ...timer,
          progress: progressValue,
        }
      });
    }, 1000 / 10);

    setTimer({
      cancel: () => {
        running = false;
        clearInterval(handle);
        setTimer(null);
      },
      progress: 0,
      index: count
    })
  }, [startTimestamp, endTimestamp]);
 
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
          position: "relative",
        }}
        onClick={clickHandler}
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
        {
          timer && (
            <LinearProgress
              variant="determinate"
              value={timer.progress}
              key={timer.index}
              
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                alignSelf: "center",
                '&[aria-valuenow="0"]': {
                  "& > .MUI-ProgressBar-Inner": {
                    transition: "none"
                  }
                }
              }}
            />
          )
        }
      </CardActionArea>
    </Card>
  )
}