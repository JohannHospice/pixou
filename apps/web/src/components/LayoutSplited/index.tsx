import { Box } from "@mui/material";
import Copyright from "../Copyright";

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
    >
      {children}
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
