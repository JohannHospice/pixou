import { createTheme } from "@mui/material/styles";

export const THEME_MODE = "dark";
export const THEME_MODE_ALT = "light";
const THEME_TYPOGRAPHY = {
  button: {
    textTransform: "inherit",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
};
const THEME_COMPONENTS = {
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: "8px" },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: { borderRadius: "8px" },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 100px rgb(40 36 59 / 80%) inset",
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      outlined: {
        top: "0px",
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        "&.Mui-error": {
          marginLeft: 0,
        },
      },
    },
    defaultProps: {},
  },
};
// A custom theme for this app
const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D9B977",
      light: "#ffeba7",
      dark: "#a6894a",
      contrastText: "#000",
    },
    secondary: {
      main: "#8C001A",
      light: "#c34041",
      dark: "#580000",
      contrastText: "#fff",
    },
    background: {
      // paper: "#fff",
      // default: "#DCD9E8",
    },
  },
  components: THEME_COMPONENTS,
  // @ts-ignore
  typography: THEME_TYPOGRAPHY,
});
const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD369",
      // light: "#ffeba7",
      // dark: "#a6894a",
      // contrastText: "#000",
    },
    secondary: {
      main: "#EEEEEE",
      // light: "#c34041",
      // dark: "#580000",
      // contrastText: "#fff",
    },
    background: {
      paper: "#393E46",
      default: "#222831",
    },
  },
  components: THEME_COMPONENTS,
  // @ts-ignore
  typography: THEME_TYPOGRAPHY,
});

export default function getTheme(mode: string) {
  return mode === "dark" ? themeDark : themeLight;
}
