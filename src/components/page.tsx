import { Header } from "./header";
import { Footer } from "./footer";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLink } from "./icon-link";
import House from "@mui/icons-material/House";

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
          {!hideHome && <IconLink to="/"><House /></IconLink>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: hideHome ? "1em" : "" }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Header title={title} home={!hideHome} /> */}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      {!hideHome && <Footer />}
    </Stack>
  );
}
