import { ColorSystemOptions, createTheme } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";
import { LinkBehavior } from "./link-behaviour";

const colorSchemeLight: ColorSystemOptions = {
  palette: {
    primary: {
      main: "#333333",
      light: "#6e707a",
      dark: "#222831",
    },
    secondary: {
      main: "#222831",
    },
    background: {
      default: "#eeeeee",
      paper: "#cccccc",
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
      main: "#eeeeee",
      light: "#6e707a",
      dark: "#222831",
    },
    secondary: {
      main: "#222831",
    },
    background: {
      default: "#222831",
      paper: "#393e46",
    },
    text: {
      primary: "#ffffff",
      secondary: "#eeeeee",
    },
    error: {
      main: "#ee3333",
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
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          overflow: "visible",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          flexGrow: 1,
        }
      }
    },
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
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        fab: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          ":hover": {
            backgroundColor: theme.palette.background.paper,
          },
        }),
      },
    },
    MuiSpeedDialIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: ({ theme }) => ({
          fontSize: "1.5em",
          fontWeight: "bold",
          margin: 0,
          padding: "0.5em 1em",
          borderRadius: "0.5em",
          backgroundColor: theme.palette.background.paper,
        }),
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

        ul {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1em;
        }
      `,
    },
  },
});
