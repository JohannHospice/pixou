import { createTheme } from "@mui/material/styles";
import { alpha, PaletteMode } from "@mui/material";

const PALETTE_PPRIMARY = "#00ADB5";
const PALETTE_SECONDARY = "#D2E69C";
const PALETTE_BACKGROUND_PAPER = "#393E46";
const PALETTE_BACKGROUND_DEFAULT = "#222831";

export default function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: PALETTE_PPRIMARY,
      },
      secondary: {
        main: PALETTE_SECONDARY,
      },
      background: {
        paper: PALETTE_BACKGROUND_PAPER,
        default: PALETTE_BACKGROUND_DEFAULT,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: "8px" },
          root: {
            borderColor: alpha(PALETTE_PPRIMARY, 0.08),
            backdropFilter: "blur(20px)",
            backgroundColor: alpha(PALETTE_BACKGROUND_PAPER, 0.7),
          },
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
    },
    typography: {
      button: {
        textTransform: "inherit",
        paddingLeft: "24px",
        paddingRight: "24px",
      },
    },
  });
}
