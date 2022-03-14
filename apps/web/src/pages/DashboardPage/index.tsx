import Layout from "../../components/Layout";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const wallets = [
  {
    symbol: "Bitcoin",
    price: 32345.65,
    amount: 1.02,
    performance: 0.42,
  },
  {
    symbol: "Ethereum",
    price: 3600.32,
    amount: 5.02,
    performance: 1.32,
  },
];
export default function DashboardPage() {
  return (
    <Layout>
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
      <Typography variant="h5" mt="16px">
        Vos cryptos monnaies
      </Typography>
      <Stack spacing={2} width="50%">
        {wallets.map((wallet, i) => (
          <Card>
            <CardContent>
              <Box display="flex">
                <Avatar></Avatar>
                <Box
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="space-between"
                  width="100%"
                  ml="8px"
                >
                  <Typography variant="h6">{wallet.symbol}</Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"flex-end"}
                  >
                    <Typography variant="caption">{wallet.price}€</Typography>
                    <Typography variant="caption">
                      +{wallet.performance * 100}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Layout>
  );
}
