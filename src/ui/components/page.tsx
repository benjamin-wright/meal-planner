import { Footer } from "./footer";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLink } from "./icon-link";
import House from "@mui/icons-material/House";
import Settings from "@mui/icons-material/Settings";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  hideNav?: boolean;
}

export function Page({ title, hideNav, children }: PageProps) {
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
      <AppBar
        position="sticky"
        sx={{
          padding: "0",
          margin: "-1em -1em 1em",
          width: "calc(100% + 2em)",
        }}
      >
        <Toolbar sx={{ padding: "0" }}>
          <IconLink to="/">
            <House />
          </IconLink>
          <Typography
            variant="h6"
            component="div"
            marginLeft="1em"
            flexGrow="1"
          >
            {title}
          </Typography>
          <IconLink to="/settings">
            <Settings />
          </IconLink>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      {!hideNav && <Footer />}
    </Stack>
  );
}
