import { Box, Container } from "@mui/material";
import Copyright from "../Copyright";
import NavigationBar from "../NavigationBar";

export default function Layout({ children }: { children: any }) {
  return (
    <Box component="main" minHeight="100vh" width="100%">
      <NavigationBar />
      <Container style={{ marginTop: "24px" }}>
        {children}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
