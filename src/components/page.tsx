import { Header } from "./header";
import { Footer } from "./footer";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PageProps {
  title: string;
  children?: React.ReactNode;
}

export function Page({ title, children }: PageProps) {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: "100%",
        backgroundColor: theme.palette.background.default + "aa",
      }}
    >
      <Header title={title} home />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Stack>
  );
}
