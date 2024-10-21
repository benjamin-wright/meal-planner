import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CircleIconProps {
  active?: boolean;
  children: React.ReactNode;
}

export function CircleIcon({ children }: CircleIconProps) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      padding="0.5em"
      borderRadius="50%"
      sx={{
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.main,
      }}
    >
      {children}
    </Box>
  );
}
