import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale,
  TimeSeriesScale,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import "chartjs-plugin-zoom";
import { getStrategy, listStrategy } from "../../api/storage";
import useFetch from "../../hooks/useFetch";
import { Link, useParams, useNavigate } from "react-router-dom";
import { STRATEGIES_ROUTE } from "../../constants/routes";

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
          setPortfolio(buildPortfolio(strat, 1000, 30 / 3));
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
    <Container fixed>
      <Stack spacing={2} mt={2}>
        <FormControl fullWidth>
          <InputLabel>Symbole</InputLabel>
          <Select
            label="Symbole"
            value={symbol}
            onChange={(e) => {
              navigate(`${STRATEGIES_ROUTE}/${e.target.value}`);
            }}
          >
            {strategies.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
    </Container>
  );
}

export function PortfolioTable({ portfolios }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Interval</TableCell>
            <TableCell align="right">Coin wallet</TableCell>
            <TableCell align="right">Coin stablecoin wallet</TableCell>
            <TableCell align="right">Money injected</TableCell>
            <TableCell align="right">Nombre d'injection</TableCell>
            <TableCell align="right">Money now</TableCell>
            <TableCell align="right">Performance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolios.map((row, i) => (
            <TableRow
              onClick={() => navigate(`${STRATEGIES_ROUTE}/${row.filename}`)}
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
              css={{
                ":hover": {
                  background: "red",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.interval}</TableCell>
              <TableCell align="right">{row.coin}</TableCell>
              <TableCell align="right">{row.reserve}</TableCell>
              <TableCell align="right">{row.indexInjected}</TableCell>
              <TableCell align="right">{row.injected}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">
                {Number(row.ratio).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LogarithmicScale,
  TimeSeriesScale,
  TimeScale
);
export function OrderLine({ klines: klinesProps, orders }) {
  const [longOrders, setlongOrders] = useState([]);
  const [shortOrders, setshortOrders] = useState([]);
  const [klines, setklines] = useState([]);

  useEffect(() => {
    if (klinesProps && orders) {
      setklines(klinesProps);

      setlongOrders(orders.filter((order) => order.type === "LONG"));
      setshortOrders(orders.filter((order) => order.type === "SHORT"));
    }
  }, [klinesProps, orders]);

  return (
    <Line
      style={{
        height: "100%",
      }}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart - Logarithmic",
          },
          // @ts-ignore
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
        },
        scales: {
          x: {
            display: true,
            type: "time",
          },
          y: {
            display: true,
            type: "logarithmic",
          },
        },
      }}
      data={{
        // labels: longOrders.map(({ closeTime }) => closeTime),
        datasets: [
          {
            label: "Long Orders",
            data: longOrders.map(({ closeTime, price }) => ({
              x: closeTime,
              y: price,
            })),
            //@ts-ignore
            type: "scatter",
            borderColor: "rgba(99, 255, 132, 1)",
            backgroundColor: "rgba(99, 255, 132, .5)",
          },
          {
            label: "Short Orders",
            data: shortOrders.map(({ closeTime, price }) => ({
              x: closeTime,
              y: price,
            })),
            //@ts-ignore
            type: "scatter",
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, .5)",
          },
          {
            label: "Klines",
            data: klines.map(({ closeTime, close }) => ({
              x: closeTime,
              y: close,
            })),
            borderColor: "rgba(99, 132, 255, .5)",
            type: "line",
            borderCapStyle: "round",
          },
        ],
      }}
    />
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
  for (let index = 0; index < strategy.klines.length; index++) {
    if (index % eachKlines === 0) {
      balance.reserve += injectPerKline;
      totalInjected += injectPerKline;
      indexInjected++;
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
  if (strategy.klines[strategy.klines.length - 1]) {
    total =
      strategy.klines[strategy.klines.length - 1].close * balance.coin +
      balance.reserve;
  }

  return {
    filename: strategy.filename,
    name: strategy.symbol,
    interval: strategy.interval,
    coin: Number(balance.coin).toFixed(2),
    reserve: Number(balance.reserve).toFixed(2),
    injected: Number(totalInjected).toFixed(2),
    total: Number(total).toFixed(2),
    ratio: Number(total / totalInjected).toFixed(2),
    indexInjected,
  };
}