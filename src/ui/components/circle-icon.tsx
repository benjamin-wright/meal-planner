import { Box } from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";

interface CircleIconProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export function CircleIcon({ children, sx }: CircleIconProps) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      padding="0.5em"
      borderRadius="50%"
      sx={{
        backgroundColor: theme.palette.background.paper,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
