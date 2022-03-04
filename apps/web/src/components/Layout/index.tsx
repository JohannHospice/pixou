import { Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Layout({
  children,
  fluid,
}: {
  children: any;
  fluid?: boolean;
}) {
  return (
    <Box bgcolor={grey[50]} minHeight="100vh" width="100%">
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
