import { IconLink } from "./icon-link";

import Settings from "@mui/icons-material/Settings";
import Scale from "@mui/icons-material/Scale";
import Sell from "@mui/icons-material/Sell";
import Egg from "@mui/icons-material/Egg";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box } from "@mui/material";

export function Footer() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      {[
        { name: "planner", icon: CalendarMonth },
        { name: "recipies", icon: RestaurantRounded },
        { name: "ingredients", icon: Egg },
        { name: "categories", icon: Sell },
        { name: "units", icon: Scale },
        { name: "settings", icon: Settings },
      ]
        .reverse()
        .map((category) => (
          <IconLink key={category.name} to={`/${category.name}`}>
            <category.icon />
          </IconLink>
        ))}
    </Box>
  );
}
