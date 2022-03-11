import { describe, it } from "@jest/globals";
import { getInstance, TIME_PERIOD } from "./index";
import { RSI } from "technicalindicators";

const clientTestnet = getInstance(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_SECRET_KEY,
  process.env.BINANCE_API_URL
);
describe("New binance tests", () => {
  it("withdraw", async () => {
    const response = await clientTestnet.depositWithdrawalHistory(1);
    console.log(response.data);
  });
});
describe.skip("Test de l'api binance", () => {
  const clientBinance = getInstance();
  const SYMBOL = "BTCUSDT";

  describe("marché", () => {
    let klines: any[];

    it("récupérer les informations d'une coin du marché", async () => {
      const { data } = await clientTestnet.exchangeInfo({ symbol: SYMBOL });
      console.log(data.symbols[0]);
    });

    it("récupérer les informations d'une coin du marché", async () => {
      const { data } = await clientBinance.klines(SYMBOL, TIME_PERIOD.WEEKLY, {
        startTime: new Date(2017, 0, 1).getTime(),
        endTime: new Date().getTime(),
      });

      console.log(
        data.map((arr: any[]) => ({
          open: arr[1],
          close: arr[4],
          high: arr[2],
          low: arr[3],
          volume: arr[5],
          openTime: new Date(arr[0]).toUTCString(),
          closeTime: new Date(arr[6]).toUTCString(),
        }))
      );
      console.log(new Date(2022, 1, 20).toUTCString());

      klines = data;
    });

    describe("analyse technique", () => {
      it("should calculate the rsi of a binance kline call", async () => {
        const rsi = RSI.calculate({
          period: 14,
          values: klines.map((arr: any[]) => Number(arr[4])),
        });

        console.log(rsi);
      });
    });
  });

  describe("compte", () => {
    it("récupération des informations de compte", async () => {
      const { data } = await clientTestnet.account();

      console.log(data);
    });
  });

  describe("ordre", () => {
    it("assigner un ordre", async () => {
      const { data } = await clientTestnet.newOrder(SYMBOL, "BUY", "LIMIT", {
        price: 350,
        quantity: 1,
        timeInForce: "GTC",
      });

      console.log(data);
    });

    it("annuler les ordres ouvert", async () => {
      const { data } = await clientTestnet.cancelOpenOrders(SYMBOL);

      console.log(data);
    });

    it("lister les ordres ouverts", async () => {
      const { data } = await clientTestnet.openOrders();

      console.log(data);
    });

    it("lister les ordres", async () => {
      const { data } = await clientTestnet.allOrders(SYMBOL);

      console.log(data);
    });
  });
});
