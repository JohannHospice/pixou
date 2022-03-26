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
export default function OrderLine({ klines: klinesProps, orders }) {
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
    <Chart
      type="scatter"
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
