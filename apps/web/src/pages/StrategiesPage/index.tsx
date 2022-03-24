import { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { getStrategy, listStrategy } from "../../api/storage";
import { buildPortfolio, PortfolioTable } from "../OrdersPage";

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
              return buildPortfolio(strategy, 1000, 30 / 3);
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
      <Stack spacing={2} mt={2}>
        {loading ? (
          "is loading"
        ) : error ? (
          "has error"
        ) : (
          <PortfolioTable portfolios={portfolios} />
        )}
      </Stack>
    </Container>
  );
}
