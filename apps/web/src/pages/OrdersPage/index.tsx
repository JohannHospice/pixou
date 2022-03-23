import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import useFetch from "../../hooks/useFetch";
import { getStrategy } from "../../api/storage";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

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
  const [symbol, setSymbol] = useState("");
  const { data, loading, error } = useFetch(
    { klines: {}, orders: {} },
    async () => {
      return getStrategy(symbol);
    },
    [symbol]
  );

  return (
    <>
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
      {loading ? (
        "is loading"
      ) : error ? (
        "has error"
      ) : (
        <OrderScatter klines={data.klines} orders={data.orders} />
      )}
    </>
  );
}

function OrderScatter({ klines, orders }) {
  const longOrders = orders.filter((order) => order.type === "LONG");
  const shortOrders = orders.filter((order) => order.type === "SHORT");
  return (
    <Scatter
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={{
        datasets: [
          {
            label: "Long Orders",
            data: Array.from({ length: 100 }, () => ({
              x: longOrders.map((order) => order.closeTime),
              y: longOrders.map((order) => order.price),
            })),
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Short Orders",
            data: Array.from({ length: 100 }, () => ({
              x: shortOrders.map((order) => order.closeTime),
              y: shortOrders.map((order) => order.price),
            })),
            backgroundColor: "rgba(99, 132, 255, 1)",
          },
        ],
      }}
    />
  );
}
