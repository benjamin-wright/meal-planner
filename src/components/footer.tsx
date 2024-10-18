import classes from "./footer.module.css";
import { IconLink } from "./icon-link";

import Settings from "@mui/icons-material/Settings"
import Scale from "@mui/icons-material/Scale"
import Sell from "@mui/icons-material/Sell"
import Egg from "@mui/icons-material/Egg"
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";

export function Footer() {
  return (
    <nav className={classes.nav}>
      <IconLink to="/settings"><Settings /></IconLink>
      <IconLink to="/units"><Scale /></IconLink>
      <IconLink to="/categories"><Sell /></IconLink>
      <IconLink to="/ingredients"><Egg /></IconLink>
      <IconLink to="/recipies"><RestaurantRounded /></IconLink>
      <IconLink to="/planner"><CalendarMonth /></IconLink>
    </nav>
  );
}
