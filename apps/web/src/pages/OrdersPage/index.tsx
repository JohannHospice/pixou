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
import { Scatter } from "react-chartjs-2";
import { getStrategy } from "../../api/storage";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";

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

const SYMBOLES = [
  "BTCUSDT",
  "ETHUSDT",
  "ADAUSDT",
  "MATICUSDT",
  "AVAXUSDT",
  "ATOMUSDT",
  "BNBUSDT",
  "LUNAUSDT",
  "SOLUSDT",
  "DOTUSDT",
  "ICPUSDT",
  "APEUSDT",
  "LINKUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "EGLDUSDT",
  "LTCUSDT",
  "VETUSDT",
  "MATICUSDT",
  "DOGEUSDT",
  "NEARUSDT",
];

export default function OrdersPage() {
  const [symbol, setSymbol] = useState(SYMBOLES[0]);
  const [data, setData] = useState({ klines: {}, orders: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (symbol) {
          setData(await getStrategy(symbol));
        }
      } catch (error) {
        console.error(error);
        setError("An error as occured");
      } finally {
        setLoading(false);
      }
    })();
  }, [symbol]);

  return (
    <Container>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Symbole</InputLabel>
          <Select
            label="Symbole"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
            }}
          >
            {SYMBOLES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        "is loading"
      ) : error ? (
        "has error"
      ) : (
        <OrderScatter klines={data.klines} orders={data.orders} />
      )}
    </Container>
  );
}

function OrderScatter(strat) {
  const [longOrders, setlongOrders] = useState([]);
  const [shortOrders, setshortOrders] = useState([]);
  const [klines, setklines] = useState([]);

  useEffect(() => {
    const { klines, orders } = strat;
    setklines(klines);
    setlongOrders(orders.filter((order) => order.type === "LONG"));
    setshortOrders(orders.filter((order) => order.type === "SHORT"));
  }, [strat]);

  return (
    <Scatter
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
        },
        scales: {
          x: {
            display: true,
            // type: "timeseries",
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
            borderColor: "rgba(99, 255, 132, 1)",
            backgroundColor: "rgba(99, 255, 132, .5)",
          },
          {
            label: "Short Orders",
            data: shortOrders.map(({ closeTime, price }) => ({
              x: closeTime,
              y: price,
            })),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, .5)",
          },
          {
            label: "Klines",
            data: klines.map(({ closeTime, close }) => ({
              x: closeTime,
              y: close,
            })),
            // color: "rgba(99, 132, 255, 1)",
            type: "scatter",
            fill: false,
          },
        ],
      }}
    />
  );
}
