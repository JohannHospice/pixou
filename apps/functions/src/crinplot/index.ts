import plotly from "plotly";
import fs from "fs";
import Strategy from "../strategies";

export function plotRest(data: any[], layout: any) {
  const plotlyInstance = plotly(
    process.env.PLOTLY_USERNAME,
    process.env.PLOTLY_API_KEY
  );
  return new Promise((resolve, reject) => {
    plotlyInstance.plot(
      data,
      {
        filename: "date-test",
        fileopt: "overwrite",
        layout,
      },
      function (err: any, msg: any) {
        if (err) {
          return reject(err);
        }
        return resolve(msg.url);
      }
    );
  });
}

export function plotStrategy(strategy: Strategy) {
  return savePlot(strategy.getTraces(), strategy.getPlotLayout());
}

export function savePlot(data: any[], layout: any) {
  fs.mkdirSync("build", { recursive: true });
  fs.writeFileSync("build/plot.json", JSON.stringify({ data, layout }));
}
