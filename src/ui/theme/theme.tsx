import { ColorSystemOptions, createTheme } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";
import { LinkBehavior } from "./link-behaviour";

const colorSchemeLight: ColorSystemOptions = {
  palette: {
    primary: {
      main: "#eeeeee",
    },
    secondary: {
      main: "#222831",
    },
    background: {
      default: "#eeeeee",
      paper: "#393e46",
    },
    text: {
      primary: "#222831",
      secondary: "#222831",
    },
  },
};

const colorSchemeDark: ColorSystemOptions = {
  palette: {
    primary: {
      main: "#393e46",
      light: "#6e707a",
    },
    secondary: {
      main: "#222831",
    },
    background: {
      default: "#222831",
      paper: "#393e46",
    },
    text: {
      primary: "#eeeeee",
      secondary: "#eeeeee",
    },
    error: {
      main: "#990000",
      light: "#ff3333",
      dark: "#660000",
      contrastText: "#eeeeee",
      contrastTextChannel: "primary",
    },
  },
};

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: colorSchemeLight,
    dark: colorSchemeDark,
  },
});

theme.components = {
  ...theme.components,
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    } as LinkProps,
  },
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: "1.75em",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
      :root,
      body,
      #root {
        height: 100%;
        width: 100%;
        line-height: 1;
      }

      :root {
        --background-image: url("/dark-background.jpg");
      }

      @media (prefers-color-scheme: light) {
        :root {
          --background-image: url("/light-background.webp");
        }
      }

      body {
        background-image: var(--background-image);
        background-size: cover;
        background-position: center;
        backdrop-filter: blur(0.3em);
        -webkit-backdrop-filter: blur(0.3em);
        margin: 0;
      }

      em {
        display: inline;
      }
    `,
  },
};
