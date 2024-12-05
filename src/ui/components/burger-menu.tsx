import { Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { IconLink } from "./icon-link";
import { ChevronRight, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface BurgerMenuProps {
  children: React.ReactNode;
}

export function BurgerMenu({ children }: BurgerMenuProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const highWidth = useMediaQuery("(min-width:600px)");

  function toggleMenu() {
    setOpen(!open);
  }

  const offset = highWidth ? "4em" : "3.5em";

  return (
    <Container sx={{ width: "auto", position: "relative", flexShrink: 1, padding: 0 }}>
      <IconLink onClick={toggleMenu}>
        {open ? <ChevronRight /> : <Menu />}
      </IconLink>
      <Box sx={{
        position: "fixed",
        top: offset,
        left: 0,
        bottom: 0,
        right: 0,
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 0.7 : 0,
        backgroundColor: theme.palette.background.default,
        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1050,
      }} onClick={toggleMenu} />
      <Box sx={{
        position: "fixed",
        top: offset,
        right: 0,
        bottom: 0,
        overflowX: "hidden",
        zIndex: 1050,
      }}>
        <Paper sx={{
          width: "100%",
          height: "100%",
          borderRadius: 0,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
}