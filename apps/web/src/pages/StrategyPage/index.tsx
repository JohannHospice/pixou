import { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Autocomplete,
  TextField,
  LinearProgress,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { getStrategy, listStrategy } from "../../api/storage";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { STRATEGIES_ROUTE } from "../../constants/routes";
import NavigationBar from "../../components/NavigationBar";
import PortfolioTable from "../../components/PortfolioTable";
import OrderLine from "../../components/OrderLine";
import Copyright from "../../components/Copyright";
import PortfolioCard from "../../components/PortfolioCard";
import { PageTitle } from "../../components/Page";
import { eurToUsd } from "../../components/PortfolioDataGrid";

export default function StrategyPage() {
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
    if (symbol !== symbolParam) {
      setSymbol(symbolParam || "");
    }

    (async () => {
      if (symbolParam) {
        try {
          setLoading(true);
          const strat = await getStrategy(symbolParam);
          setPortfolio(buildPortfolio(strat, eurToUsd(100), 30 / 3));
          setData(strat);
          setError(undefined);
        } catch (error) {
          console.error(error);
          setError("An error as occured");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [symbol, symbolParam]);

  return (
    <PageTitle title={`Stratégie ${symbol} - Pixou`}>
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
        <Stack spacing={2} mt={2} flex={1}>
          <Autocomplete
            fullWidth
            disablePortal
            options={strategies}
            loading={loading || loadingStrategies}
            noOptionsText="Aucune option"
            loadingText="Chargement..."
            openText="Ouvert"
            value={symbol}
            onChange={(e, value) => {
              navigate(`${STRATEGIES_ROUTE}/${value}`);
            }}
            renderInput={(params) => <TextField {...params} label="Symbole" />}
          />
          <LinearProgress
            sx={{ opacity: loading || loadingStrategies ? "1" : "0" }}
          />
          {(loading || loadingStrategies) && !data ? (
            <></>
          ) : error || errorStrategies ? (
            "has error"
          ) : (
            data && (
              <>
                <OrderLine
                  symbol={data.symbol}
                  klines={data.klines}
                  orders={data.orders}
                />
                <PortfolioCard portfolio={portfolio} />
              </>
            )
          )}
        </Stack>
        <Copyright
          sx={{
            mt: "12px",
          }}
        />
      </Container>
    </PageTitle>
  );
}

export function buildPortfolio(
  strategy: any,
  injectPerKline: number,
  eachKlines: number
): Portfolio {
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
    gains: total - totalInjected,
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
    buyAndHoldGains: buyAndHoldTotal - totalInjected,
    yearly: indexInjected / 12,
  };
}

export interface Portfolio {
  filename: string;
  name: string;
  interval: string;
  coin: number;
  reserve: number;
  injected: number;
  gains: number;
  total: number;
  ratio: number;
  ratioInPercent: number;
  performanceHODL: number;
  indexInjected: number;
  injectPerKline: number;
  lastOrderType: string;
  buyAndHoldCoin: number;
  buyAndHoldTotal: number;
  buyAndHoldRatio: number;
  buyAndHoldGains: number;

  yearly: number;
}
