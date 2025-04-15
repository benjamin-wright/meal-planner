import {
  MenuItem,
  Typography,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useNavigate, useLocation } from "react-router-dom";
import { BurgerMenu } from "./burger-menu";
import { Checklist, Storage } from "@mui/icons-material";

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(category: string) {
    navigate(`/${category}`);
  }

  const options = [
    { name: "list", icon: Checklist },
    { name: "planner", icon: CalendarMonth },
    { name: "data", icon: Storage },
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
