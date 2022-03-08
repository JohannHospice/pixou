// import { red } from "@mui/material/colors";
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
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: "8px" },
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
  typography: THEME_TYPOGRAPHY,
});
const themeDark = createTheme({
  palette: {
    mode: "dark",
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
      paper: "#28243b",
      default: "#28243b",
    },
  },
  components: THEME_COMPONENTS,
  typography: THEME_TYPOGRAPHY,
});

export default function getTheme(mode) {
  return mode === "dark" ? themeDark : themeLight;
}
