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

  return <Slide in={visible} direction={direction} timeout={300}>
    <Box position="absolute" width="100%" height="100%" top={0} left={0}>
      {children}
    </Box>
  </Slide>
}

interface PanelsProps {
  children: React.ReactNode;
  selected: number;
  onSelectedChanged?: (selected: number) => void;
}

export function Panels({ children, selected, onSelectedChanged }: PanelsProps) {
  const [lastSelected, setLastSelected] = useState(selected);
  const [direction, setDirection] = useState<"left" | "right">("left");

  function down() {
    if (onSelectedChanged) {
      onSelectedChanged(selected - 1);
    }
  }

  function up() {
    if (onSelectedChanged) {
      onSelectedChanged(selected + 1);
    }
  }

  if (lastSelected !== selected) {
    setDirection(selected > lastSelected ? "left" : "right");
    setLastSelected(selected);
  }

  return <Box height="100%" width="100%" position="relative" overflow="hidden">
    <Box height="100%" marginLeft="3.5em" marginRight="3.5em" position="relative">
      {Children.map(children, (child, index) => <SlidePanel key={index} visible={index === selected} direction={direction}>{child}</SlidePanel>)}
    </Box>
    <Box position="absolute" top="0" right="0" bottom="0" left="0" display="flex" alignItems={"center"} justifyContent={"space-between"} sx={{
      pointerEvents: "none",
    }}>
      <IconLink onClick={down} disabled={selected <= 0} sx={{pointerEvents: "auto"}}>
        <ArrowBack />
      </IconLink>
      <IconLink onClick={up} disabled={selected >= Children.count(children) - 1} sx={{pointerEvents: "auto"}}>
        <ArrowForward />
      </IconLink>
    </Box>
  </Box>
}
