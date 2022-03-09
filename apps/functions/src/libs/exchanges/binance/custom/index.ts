import axios, { AxiosInstance } from "axios";
import * as crypto from "crypto";

class Binance {
  apiKey: string;
  secretKey: string;
  instance: AxiosInstance;
  constructor({
    apiKey,
    secretKey,
    baseUrl,
  }: {
    apiKey: string;
    secretKey: string;
    baseUrl: string;
  }) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.instance = axios.create({
      baseURL: baseUrl,
    });
    this.instance.defaults.headers.common["X-MBX-APIKEY"] = this.apiKey;
    this.instance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  sign(queryString: string) {
    return (
      "&signature=" +
      crypto
        .createHmac("sha256", this.secretKey)
        .update(queryString)
        .digest("hex")
    );
  }

  createSearchParam(options: BinanceOptionType) {
    const searchparams = new URLSearchParams();
    Object.keys(options).forEach((key) => {
      if (Array.isArray(options[key])) {
        // @ts-ignore
        options[key].forEach((value) => {
          searchparams.append(key, value);
        });
      } else {
        searchparams.append(key, String(options[key]));
      }
    });
    return searchparams.toString();
  }

  createSignedSearchParam(options: BinanceOptionType) {
    const queryString = this.createSearchParam(options);
    return queryString + this.sign(queryString);
  }

  queryOrder(options: {
    symbol: string;
    orderId: number;
    origClientOrderId: string;
    recvWindow: number;
    timestamp: number;
  }) {
    return this.instance.get("order" + this.createSignedSearchParam(options));
  }

  // POST REQUEST TO PLACE AN ORDER options = {}
  placeOrder(options: {
    symbol: string;
    side: string[];
    type: string[];
    timeInForce: string[];
    quantity: number;
    price: number;
    newClientOrderId: string;
    stopPrice: number;
    icebergQty: number;
    recvWindow: number;
    timestamp: number;
  }) {
    return this.instance.post("order", this.createSignedSearchParam(options));
  }
}

type BinanceOptionType = { [x: string]: string[] | string | boolean | number };

export default Binance;
