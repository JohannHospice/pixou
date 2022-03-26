import { useState, useEffect } from "react";
import { Container, Stack, Autocomplete, TextField } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { getStrategy, listStrategy } from "../../api/storage";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { STRATEGIES_ROUTE } from "../../constants/routes";
import NavigationBar from "../../components/NavigationBar";
import PortfolioTable from "../../components/PortfolioTable/idnex";
import OrderLine from "../../components/OrderLine";
import Copyright from "../../components/Copyright";

export default function OrdersPage() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const {
    data: strategies,
    loading: loadingStrategies,
    error: errorStrategies,
  } = useFetch([], listStrategy);
  const [portfolio, setPortfolio] = useState<any>();
  const { symbol: symbolParam } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (symbol) {
          const strat = await getStrategy(symbol);
          setPortfolio(buildPortfolio(strat, 100, 30 / 3));
          setData(strat);
        }
      } catch (error) {
        console.error(error);
        setError("An error as occured");
      } finally {
        setLoading(false);
      }
    })();
  }, [symbol]);

  useEffect(() => {
    if (symbolParam) {
      setSymbol(symbolParam);
      return;
    }
  }, [symbolParam]);

  return (
    <Container
      maxWidth="lg"
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavigationBar
        action={{
          Icon: ArrowBackIosNewOutlinedIcon,
          onClick: () => navigate(STRATEGIES_ROUTE),
        }}
      />
      <Stack spacing={2} mt={2}>
        <Autocomplete
          fullWidth
          disablePortal
          options={strategies}
          loading={loadingStrategies}
          noOptionsText="Aucune option"
          loadingText="Chargement..."
          openText="Ouvert"
          onChange={(e, value) => {
            navigate(`${STRATEGIES_ROUTE}/${value}`);
          }}
          renderInput={(params) => <TextField {...params} label="Symbole" />}
        />
        {loading || loadingStrategies
          ? "is loading"
          : error || errorStrategies
          ? "has error"
          : data && (
              <>
                <OrderLine klines={data.klines} orders={data.orders} />
                <PortfolioTable portfolios={[portfolio]} />
              </>
            )}
      </Stack>
      <Copyright
        sx={{
          mt: "12px",
        }}
      />
    </Container>
  );
}

export function buildPortfolio(
  strategy: any,
  injectPerKline: number,
  eachKlines: number
) {
  let balance = {
    coin: 0,
    reserve: 0,
  };
  let totalInjected = 0;
  let indexInjected = 0;
  let buyAndHoldCoin = 0;
  for (let index = 0; index < strategy.klines.length; index++) {
    if (index % eachKlines === 0) {
      balance.reserve += injectPerKline;
      totalInjected += injectPerKline;
      indexInjected++;
      buyAndHoldCoin += injectPerKline / strategy.klines[index].close;
    }
    const order = strategy.orders[index];
    if (order) {
      balance =
        order.type === "LONG"
          ? {
              coin: balance.coin + balance.reserve / order.price,
              reserve: 0,
            }
          : {
              coin: 0,
              reserve: balance.reserve + order.price * balance.coin,
            };
    }
  }
  let total = 0;
  let buyAndHoldTotal = 0;
  if (strategy.klines[strategy.klines.length - 1]) {
    total =
      strategy.klines[strategy.klines.length - 1].close * balance.coin +
      balance.reserve;
    buyAndHoldTotal =
      strategy.klines[strategy.klines.length - 1].close * buyAndHoldCoin;
  }
  const ratio = total / totalInjected;

  return {
    filename: strategy.filename,
    name: strategy.symbol,
    interval: strategy.interval,
    coin: balance.coin,
    reserve: balance.reserve,
    injected: totalInjected,
    total: total,
    ratio: ratio,
    ratioInPercent: ratio,
    performanceHODL: total / buyAndHoldTotal,
    indexInjected,
    injectPerKline,
    lastOrderType: strategy.orders[strategy.orders.length - 1].type,
    buyAndHoldCoin,
    buyAndHoldTotal,
    buyAndHoldRatio: buyAndHoldTotal / totalInjected,
    yearly: indexInjected / 12,
  };
}
