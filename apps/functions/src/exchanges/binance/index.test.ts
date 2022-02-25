import { describe, beforeAll, it } from "@jest/globals";
import { getInstance } from "./index";
import dotenv from "dotenv";
dotenv.config();

describe("Test de l'api binance", () => {
  let client: any = undefined;
  const SYMBOL = "BNBUSDT";
  beforeAll(() => {
    client = getInstance({
      key: process.env.BINANCE_API_KEY,
      secret: process.env.BINANCE_SECRET_KEY,
      baseURL: process.env.BINANCE_API_URL,
    });
  });

  it("récupération des informations de compte", async () => {
    const { data } = await client.account();

    console.log(data);
  });

  describe("ordre", () => {
    it("assigner un ordre", async () => {
      const { data } = await client.newOrder(SYMBOL, "BUY", "LIMIT", {
        price: "350",
        quantity: 1,
        timeInForce: "GTC",
      });

      console.log(data);
    });

    it("annuler les ordres ouvert", async () => {
      const { data } = await client.cancelOpenOrders(SYMBOL);

      console.log(data);
    });

    it("lister les ordres ouverts", async () => {
      const { data } = await client.openOrders();

      console.log(data);
    });

    it.skip("lister les ordres", async () => {
      const { data } = await client.allOrders(SYMBOL);

      console.log(data);
    });
  });
});
