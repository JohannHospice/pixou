import { logout } from "../../api/authentification";
import Layout from "../../components/Layout";
import { ReactComponent as Logo } from "../../assets/logos/logo-text-img.svg";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Layout title={<Logo />}>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection={"column"}>
            <Typography variant="h6">Portefeuille</Typography>
            <Typography variant="caption">Montant géré par Pixou</Typography>
            <Box display={"inline-flex"}>
              <Typography variant="h5">{2509.74}€</Typography>
              <Typography variant="body2">+{9.77}%</Typography>
            </Box>
            <Typography variant="caption">Apports</Typography>
            <Typography variant="body1">{1500}€</Typography>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}
