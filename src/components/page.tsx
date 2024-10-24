import { Footer } from "./footer";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CircleIcon } from "./circle-icon";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  hideNav?: boolean;
  icon: React.ReactNode;
}

export function Page({ title, icon, hideNav, children }: PageProps) {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="space-between"
      height="100%"
      margin={0}
      padding="1em"
      sx={{
        backgroundColor: theme.palette.background.default + "aa",
      }}
    >
      <AppBar position="sticky" sx={{
        padding: "0",
        margin: "-1em -1em 1em",
        width: "calc(100% + 2em)"
      }}>
        <Toolbar sx={{ padding: "0" }}>
          <CircleIcon>{icon}</CircleIcon>
          <Typography variant="h6" component="div" marginLeft="1em" flexGrow="1">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      {!hideNav && <Footer />}
    </Stack>
  );
}
