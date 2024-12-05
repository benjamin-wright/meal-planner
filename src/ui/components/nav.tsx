import {
  Box,
  Drawer,
  Menu,
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
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { IconLink } from "./icon-link";

export function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  function navigateTo(category: string) {
    navigate(`/${category}`);
  }

  const options = [
    { name: "planner", icon: CalendarMonth },
    { name: "recipies", icon: RestaurantRounded },
    { name: "ingredients", icon: Egg },
    { name: "categories", icon: Sell },
    { name: "units", icon: Scale },
    { name: "settings", icon: Settings },
  ];

  return (
    <>
      <IconLink onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconLink>
      <Drawer anchor="right" transitionDuration={{ enter: 500000, exit: 500 }} open={open} onClose={() => setOpen(false)} PaperProps={{
        sx: {
          marginTop: "3.5em",
          height: "unset",
          bottom: "0"
        }
      }}>
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
      </Drawer>
    </>
  );
}
