import {
  MenuItem,
  Typography,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Scale from "@mui/icons-material/Scale";
import Sell from "@mui/icons-material/Sell";
import Egg from "@mui/icons-material/Egg";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useNavigate, useLocation } from "react-router-dom";
import { BurgerMenu } from "./burger-menu";
import { Checklist } from "@mui/icons-material";

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(category: string) {
    navigate(`/${category}`);
  }

  const options = [
    { name: "list", icon: Checklist },
    { name: "planner", icon: CalendarMonth },
    { name: "recipies", icon: RestaurantRounded },
    { name: "ingredients", icon: Egg },
    { name: "categories", icon: Sell },
    { name: "units", icon: Scale },
    { name: "settings", icon: Settings },
  ];

  return (
    <BurgerMenu>
      {options.map((option) => (
        <MenuItem key={option.name} onClick={() => navigateTo(option.name)} sx={{
          padding: "1em",
          display: "flex",
          justifyContent: "stretch",
        }} disabled={location.pathname === "/" + option.name}>
          <option.icon />
          <Typography variant="h6" sx={{
            marginLeft: "1em",
          }}>{option.name}</Typography>
        </MenuItem>
      ))}
    </BurgerMenu>
  );
}
