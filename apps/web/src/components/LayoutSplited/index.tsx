import { Box } from "@mui/material";
import Copyright from "../Copyright";
import { styled } from "@mui/material/styles";
import "./index.css";
export default function LayoutSplited({ children }: { children: any }) {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="css-selector"
    >
      {children}
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
