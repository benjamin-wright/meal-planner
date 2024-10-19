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
      <IconLink to="/settings">
        <Settings />
      </IconLink>
      <IconLink to="/units">
        <Scale />
      </IconLink>
      <IconLink to="/categories">
        <Sell />
      </IconLink>
      <IconLink to="/ingredients">
        <Egg />
      </IconLink>
      <IconLink to="/recipies">
        <RestaurantRounded />
      </IconLink>
      <IconLink to="/planner">
        <CalendarMonth />
      </IconLink>
    </Box>
  );
}
