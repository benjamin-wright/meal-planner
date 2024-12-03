import { Footer } from "./footer";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLink } from "./icon-link";
import House from "@mui/icons-material/House";
import Settings from "@mui/icons-material/Settings";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  hideNav?: boolean;
  returnTo?: string;
  noScroll?: boolean;
}

export function Page({
  title,
  hideNav,
  children,
  returnTo,
  noScroll,
}: PageProps) {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="space-between"
      height="100%"
      maxHeight="100%"
      margin={0}
      padding="1em"
      sx={{
        backgroundColor: theme.palette.background.default + "aa",
      }}
    >
      <AppBar>
        <Toolbar sx={{ padding: "0" }}>
          <IconLink to={returnTo ? returnTo : "/"}>
            {returnTo ? <ArrowBack /> : <House />}
          </IconLink>
          <Typography
            variant="h6"
            component="div"
            marginLeft="1em"
            flexGrow="1"
          >
            {title}
          </Typography>
          {!returnTo && (
            <IconLink to="/settings">
              <Settings />
            </IconLink>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: "3em",
          flexGrow: 1,
          height: "100%",
          maxHeight: "100%",
          overflow: noScroll ? "hidden" : "scroll",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          paddingBottom: "3.5em"
        }}
      >
        {children}
      </Box>
      {!hideNav && <Footer />}
    </Stack>
  );
}
