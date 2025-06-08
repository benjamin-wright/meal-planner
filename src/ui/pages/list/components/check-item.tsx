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
const LONG_PRESS_PERIOD = 1000;

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

    if (!startTimestamp || !endTimestamp || endTimestamp < Date.now()) {
      console.info(`CheckItem [${count}: ${item.name}]: No active animation, resetting state`);
      
      if (timer) {
        timer.cancel();
        setTimer(null);
      }
      
      return;
    }

    if (timer) {
      console.info(`CheckItem [${count}: ${item.name}]: Cancelling previous animation interval`);
      timer.cancel();
    }

    console.info(`CheckItem [${count}: ${item.name}]: Starting animation from ${startTimestamp} to ${endTimestamp}`);
    
    let running = true;
    const handle = setInterval(() => {
      if (!running) {
        console.info("CheckItem: Animation stopped, clearing interval");
        clearInterval(handle);
        return;
      }

      if (!startTimestamp || !endTimestamp || endTimestamp < Date.now()) {
        console.info(`CheckItem [${count}: ${item.name}]: Animation ended, resetting state`);
        clearInterval(handle);
        return;
      }

      const duration = endTimestamp - startTimestamp;
      const now = Date.now();
      const elapsed = now - startTimestamp;
      const progressValue = Math.min(100, (elapsed / duration) * 100) + 100 / 10; // Add a small offset to account for animation lag
      setTimer(timer => {
        if (!timer) {
          console.warn(`CheckItem [${count}: ${item.name}]: Timer is null, cannot update progress`);
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
        console.info(`CheckItem [${count}: ${item.name}]: Cancelling animation interval`);
        running = false;
        clearInterval(handle);
        setTimer(null);

        // Clear touch start timeout if it exists
        // This is to prevent the long press from triggering after the animation ends
        if (touchStart) {
          clearTimeout(touchStart)
        }
      },
      progress: 0,
      index: count
    })
  }, [startTimestamp, endTimestamp]);

  let touchStart: number | null = null;

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
      touchStart = null;
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
          opacity: debouncing ? "40%" : "100%"
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