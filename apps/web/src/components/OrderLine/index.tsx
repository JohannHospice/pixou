import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import "chartjs-plugin-zoom";
import { Box } from "@mui/material";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
export default function OrderLine({ symbol, klines: klinesProps, orders }) {
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
    <Box
      style={{
        flex: 1,
        maxHeight: "100vh",
      }}
    >
      <Chart
        type="scatter"
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stratégie appliqué sur le " + symbol,
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
              label: "Période d'accumulation",
              showLine: false,
              data: longOrders.map(({ closeTime, price }) => ({
                x: closeTime,
                y: price,
              })),
              type: "line",
              borderColor: "rgba(99, 255, 132, 1)",
              backgroundColor: "rgba(99, 255, 132, .5)",
            },
            {
              label: "Période de vente",
              showLine: false,
              data: shortOrders.map(({ closeTime, price }) => ({
                x: closeTime,
                y: price,
              })),
              type: "line",
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, .5)",
            },
            {
              label: "Prix du " + symbol,
              showLine: true,
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
    </Box>
  );
}
