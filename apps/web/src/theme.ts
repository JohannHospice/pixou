// import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DDC3A5",
      light: "#fff6d6",
      dark: "#ab9376",
      contrastText: "#000",
    },
    secondary: {
      main: "#A6B1E1",
      light: "#d8e3ff",
      dark: "#7682af",
      contrastText: "#000",
    },
    background: {
      // default: "#201E20",
    },
  },
  typography: {
    button: {
      textTransform: "inherit",
      paddingLeft: "24px",
      paddingRight: "24px",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: "8px" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "13px 15px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          top: "-2px",
        },
      },
    },
  },
});

export default theme;
