import { useState, useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { getStrategy, listStrategy } from "../../api/storage";
import { buildPortfolio } from "../OrdersPage";
import NavigationBar from "../../components/NavigationBar";
import { PortfolioDataGrid } from "../../components/PortfolioTable/idnex";
import Copyright from "../../components/Copyright";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [portfolios, setPortfolios] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const strategyList = await listStrategy();
        console.log({ strategyList });

        const data = await Promise.all(
          strategyList.map(async (filename) => {
            try {
              const strategy = await getStrategy(filename);
              return buildPortfolio(strategy, 100, 30 / 3);
            } catch (err) {
              return undefined;
            }
          })
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
        <Typography variant="h3" component={"h1"}>
          Indice d'achat de cryptomonnaies
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
