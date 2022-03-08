import Layout from "../../components/Layout";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const wallets = [
  {
    symbol: "btc",
    price: 32345,
    amount: 1.02,
    performance: 0.4,
  },
  {
    symbol: "eth",
    price: 4000,
    amount: 5.02,
    performance: 2,
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
      <Typography variant="h5">Vos cryptos monnaies</Typography>
      {wallets.map((wallet, i) => (
        <Card>
          <CardContent>
            <Box display="flex">
              <Avatar></Avatar>
              <Box display="flex" flexDirection={"column"}>
                <Typography variant="h6">{wallet.symbol}</Typography>
                <Box display="flex">
                  <Typography variant="caption">{wallet.price}</Typography>
                  <Typography variant="caption">
                    +{wallet.performance * 100}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Layout>
  );
}
