import { AppBar, Box, Stack, SxProps, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLink } from "./icon-link";
import House from "@mui/icons-material/House";
import { Nav } from "./nav";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  returnTo?: string;
  showNav?: boolean;
  noScroll?: boolean;
  sx?: SxProps;
}

export function Page({
  title,
  children,
  returnTo,
  noScroll,
  showNav,
  sx
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
            role="heading"
            marginLeft="1em"
            flexGrow="1"
            noWrap
            paddingRight="1em"
            textOverflow="ellipsis"
          >
            {title}
          </Typography>
          {showNav && (
            <Nav />
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: "3em",
          flexGrow: 1,
          height: "100%",
          maxHeight: "100%",
          overflowY: noScroll ? "hidden" : "scroll",
          display: "flex",
          flexDirection: "column",
          gap: "0.25em",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
