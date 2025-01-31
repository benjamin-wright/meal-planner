import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Slide } from "@mui/material";
import { Children, useState } from "react";
import { IconLink } from "./icon-link";

interface SlidePanelProps {
  children: React.ReactNode;
  visible: boolean;
  direction: "left" | "right";
}

function SlidePanel({ children, visible, direction }: SlidePanelProps) {
  if (!visible) {
    direction = direction === "left" ? "right" : "left";
  }

  return <Slide in={visible} direction={direction}>
    <Box position="absolute" width="100%" height="100%" top={0} left={0}>
      {children}
    </Box>
  </Slide>
}

interface PanelsProps {
  children: React.ReactNode;
  onSelectedChanged?: (selected: number) => void;
}

export function Panels({ children, onSelectedChanged }: PanelsProps) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  function down() {
    setDirection("right");
    setSelected(selected - 1);
    if (onSelectedChanged) {
      onSelectedChanged(selected - 1);
    }
  }

  function up() {
    setDirection("left");
    setSelected(selected + 1);
    if (onSelectedChanged) {
      onSelectedChanged(selected + 1);
    }
  }

  return <Box height="100%" width="100%" overflow="hidden" position="relative">
    {Children.map(children, (child, index) => <SlidePanel key={index} visible={index === selected} direction={direction}>{child}</SlidePanel>)}
    <Box position="absolute" width="100%" height="100%" display="flex" alignItems={"center"} justifyContent={"space-between"}>
      <IconLink onClick={down} disabled={selected === 0}>
        <ArrowBack />
      </IconLink>
      <IconLink onClick={up} disabled={selected === Children.count(children) - 1}>
        <ArrowForward />
      </IconLink>
    </Box>
  </Box>
}
