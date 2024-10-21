import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

interface IconLinkProps {
  to: string;
  children: React.ReactNode;
}

export function IconLink({ to, children }: IconLinkProps) {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button href={to}>
      <Box
        display="flex"
        padding="0.5em"
        borderRadius="50%"
        sx={{
          backgroundColor: isActive
            ? theme.palette.text.primary
            : theme.palette.primary.main,
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.text.primary,
        }}
      >
        {children}
      </Box>
      ;
    </Button>
  );
}
