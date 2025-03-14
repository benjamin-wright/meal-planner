import {
  CloseReason,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import Scale from "@mui/icons-material/Scale";
import Sell from "@mui/icons-material/Sell";
import Egg from "@mui/icons-material/Egg";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Footer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function navigateTo(category: string) {
    navigate(`/${category}`);
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
      }}
      icon={<SpeedDialIcon />}
      onClose={(_, reason: CloseReason) => {
        if (reason !== "mouseLeave") {
          setOpen(false);
        }
      }}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {[
        { name: "planner", icon: CalendarMonth },
        { name: "recipies", icon: RestaurantRounded },
        { name: "ingredients", icon: Egg },
        { name: "categories", icon: Sell },
        { name: "units", icon: Scale },
      ]
        .reverse()
        .map((category) => (
          <SpeedDialAction
            key={category.name}
            icon={<category.icon />}
            tooltipTitle={category.name}
            onClick={() => navigateTo(category.name)}
          />
        ))}
    </SpeedDial>
  );
}
