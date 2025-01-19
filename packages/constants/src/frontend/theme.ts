export const FONTS = Object.freeze({
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600",
  BOLD: "700",
});

export const FONT_SIZE = Object.freeze({
  PARA: 17,
  HEADING_1: 25,
  HEADING_2: 23,
  HEADING_3: 21,
  HEADING_4: 19,
});


export const FORM_SIZE = Object.freeze({
  EXTRA_EXTRA_LARGE: 1300,
  EXTRA_LARGE: 1120,
  LARGE: 900,
  MEDIUM: 650,
  SMALL: 500,
  EXTRA_SMALL: 400,
});

export const Z_INDEX = Object.freeze({
  APP_DIALOG: 15,
  HEADER: 5,
  SIDEBAR_WRAPPER: 9,
  HORIZONTAL_COLLAPSE: 10,
  HORIZONTAL_GROUP: 10,
  VERTICAL_COLLAPSE_ITEM: 10,
  SIDEBAR_LIST_ITEM: 10,
});

const cardRadius = 16;

export const theme = {
  spacing: 4,
  cardRadius: cardRadius,
  direction: "ltr",

  themeStyle: "standard",
  themeMode: "light",
  palette: {
    warning: {
      main: "#FF5252",
      light: "#FFECDC",
    },
    mode: "light",
    primary: {
      main: "#6E3A4B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D38C48",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FCF8F5",
    },
    text: {
      primary: "rgb(17, 24, 39)",
      secondary: "rgb(107, 114, 128)",
      disabled: "rgb(149, 156, 169)",
    },
    gray: {
      50: "#fafafa",
      100: "#F5F6FA",
      200: "#edf2f7",
      300: "#E0E0E0",
      400: "#c5c6cb",
      500: "#A8A8A8",
      600: "#666666",
      700: "#4a5568",
      800: "#201e21",
      900: "#1a202c",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
  },
  status: {
    danger: "orange",
  },
  divider: "rgba(224, 224, 224, 1)",
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontOpticalSizing: "auto",
    fontSize: 14,
    fontWeight: 400,

    h1: {
      fontSize: 22,
      fontWeight: 600,
    },
    h2: {
      fontSize: 20,
      fontWeight: 500,
    },
    h3: {
      fontSize: 18,
      fontWeight: 500,
    },
    h4: {
      fontSize: 16,
      fontWeight: 500,
    },
    h5: {
      fontSize: 14,
      fontWeight: 500,
    },
    h6: {
      fontSize: 12,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14,
    },

    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontSize: 15,
    },
    body2: {
      fontSize: 12,
    },
  },
  components: {
    Typography: {
      defaultProps: {
        component: "span",
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
        },
      },
    },
    MuiCardLg: {
      styleOverrides: {
        root: {
          // apply theme's border-radius instead of component's default
          borderRadius: cardRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
          boxShadow: "0px 10px 10px 4px rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: cardRadius / 2,
          textTransform: "capitalize",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: cardRadius / 2,
          textTransform: "capitalize",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius / 2,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius / 2,
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiIconButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiLink: {
      styleOverrides: {
        defaultProps: {
          color: "primary.main",
        },
        root: {
          fontWeight: FONTS.BOLD,
          textDecoration: "none",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "#d32f2f" },
      },
    },
  },
};
