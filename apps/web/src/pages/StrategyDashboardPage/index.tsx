import { useState, useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { getResume } from "../../api/storage";
import NavigationBar from "../../components/NavigationBar";
import Copyright from "../../components/Copyright";
import PortfolioDataGrid from "../../components/PortfolioDataGrid";

export default function StrategyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [portfolios, setPortfolios] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await getResume().then((set) =>
          Object.keys(set).map((key) => set[key])
        );

        console.log({ data });
        setPortfolios(data.filter((strategy) => strategy !== undefined));
      } catch (error) {
        console.error(error);
        setError("An error as occured");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Container fixed>
      <NavigationBar />
      <Stack spacing={2} mt={2}>
        <Typography variant="h4" component={"h1"}>
          Indice d'achat de cryptomonnaies
        </Typography>
        <Typography variant="body1" maxWidth="800px">
          Pour ces simulations nous prennons un utilisateur investissant tous
          les mois 100 € dans la crypto.
          <br />
          Notre stratégie constitue une réserve de <i>stablecoin</i> lorsque le
          marché en baissier, puis le réinvestie dans le <i>token</i> en
          question lorsque le marché est à la hausse.
        </Typography>
        <PortfolioDataGrid
          portfolios={portfolios}
          loading={loading}
          error={error}
        />
        <Copyright
          sx={{
            mt: "12px",
          }}
        />
      </Stack>
    </Container>
  );
}
