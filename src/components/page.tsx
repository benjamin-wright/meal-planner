import { Header } from "./header";
import { Footer } from "./footer";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  hideHome?: boolean;
}

export function Page({ title, hideHome, children }: PageProps) {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="space-between"
      height="100%"
      margin={0}
      padding="0.5em"
      sx={{
        backgroundColor: theme.palette.background.default + "aa",
      }}
    >
      <Header title={title} home={!hideHome} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Stack>
  );
}
