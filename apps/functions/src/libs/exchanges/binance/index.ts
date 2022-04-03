import axios from "axios";
import Exchange from "..";
export enum TIME_PERIOD {
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  HALF_HOURLY = "30m",
  HOURLY = "1h",
  TWO_HOURLY = "2h",
  FOUR_HOURLY = "4h",
  SIX_HOURLY = "6h",
  EIGHT_HOURLY = "8h",
  TWELVE_HOURLY = "12h",
  DAILY = "1d",
  THREE_DAILY = "3d",
  WEEKLY = "1w",
  MONTHLY = "1M",
}
// const TIME_INTERVAL: { [x: string]: number } = {
//   "3d": 3600 * 1000 * 24 * 3,
// };
export class BinanceSpot implements Exchange {
  dirname = "./build/klines";

  constructor(public key = "", public secret = "", public baseURL?: string) {
    // this.exchangeInfo()
    //   .then(({ data }: { data: any }) =>
    //     fs.writeFileSync(
    //       "./build/exchange-info.json",
    //       JSON.stringify(data, null, 4)
    //     )
    //   )
    //   .catch(() => {});
  }

  async klines(
    symbol: string,
    interval: string,
    options?: {
      startTime?: number | undefined;
      endTime?: number | undefined;
    }
  ): Promise<{
    data: any;
  }> {
    function stringifyKeyValuePair([key, value]) {
      const valueString = Array.isArray(value)
        ? // eslint-disable-next-line quotes
          `["${value.join('","')}"]`
        : value;
      return `${key}=${encodeURIComponent(valueString)}`;
    }

    const buildQueryString = (params) => {
      if (!params) return "";
      return Object.entries(params).map(stringifyKeyValuePair).join("&");
    };

    return axios
      .create({
        baseURL: "https://api.binance.com",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "pixou-node/1.0.1",
        },
      })
      .request({
        method: "GET",
        url: `/api/v3/klines?${buildQueryString(
          Object.assign(options, {
            symbol: symbol.toUpperCase(),
            interval: interval,
          })
        )}`,
      });
  }

  // async fetchKlines(
  //   symbol: string,
  //   interval: string,
  //   options?: {
  //     startTime?: number | undefined;
  //     endTime?: number | undefined;
  //   }
  // ): Promise<{
  //   data: any;
  // }> {
  //   const { data } = await super.klines(symbol, interval, {
  //     ...options,
  //     limit: 1000,
  //   });

  //   // if (!fs.existsSync(this.dirname)) {
  //   //   fs.mkdirSync(this.dirname);
  //   // }

  //   // this.writeKlines(symbol, interval, data);

  //   return { data };
  // }

  // writeKlines(symbol: string, interval: string, data: any[]): void {
  //   const filename = this.getFileName(symbol, interval);
  //   let dataToWrite = data;
  //   try {
  //     if (fs.existsSync(filename)) {
  //       dataToWrite = JSON.parse(fs.readFileSync(filename, "utf-8"));

  //       data.forEach((element: any[]) => {
  //         if (!dataToWrite.some((up: any[]) => up[0] === element[0])) {
  //           dataToWrite.push(element);
  //         }
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   fs.writeFileSync(filename, JSON.stringify(dataToWrite));
  // }

  // async readKlines(
  //   symbol: string,
  //   interval: string,
  //   options?: {
  //     startTime?: number | undefined;
  //     endTime?: number | undefined;
  //   }
  // ): Promise<{
  //   data: any;
  // }> {
  //   const klines = JSON.parse(
  //     fs.readFileSync(this.getFileName(symbol, interval), "utf-8")
  //   );

  //   if (this.notEnoughtData(klines, interval, options)) {
  //     throw {
  //       message: "Data need to be updated",
  //       data: {
  //         endTime: options?.endTime,
  //         startTime: options?.startTime,
  //         first: klines[0][0],
  //         last: klines[klines.length - 1][0],
  //       },
  //     };
  //   }

  //   return {
  //     data: klines.filter((kline: any) => {
  //       let inBound = true;
  //       if (options?.startTime) inBound = options?.startTime < kline[0];
  //       if (options?.endTime) inBound = options?.endTime > kline[0] && inBound;
  //       return inBound;
  //     }),
  //   };
  // }
  // notEnoughtData(klines: any, interval: string, options: any): boolean {
  //   return (
  //     (options?.endTime &&
  //       options?.endTime >
  //         klines[klines.length - 1][0] + TIME_INTERVAL[interval]) ||
  //     (options?.startTime && options?.startTime < klines[0][0])
  //   );
  // }
  // getFileName(symbol: string, interval: string): string {
  //   return `${this.dirname}/${symbol}-${interval}.json`;
  // }

  /**
   * Unofficial market information<br>
   *
   * GET /exchange-api/v2/public/asset-service/product/get-products<br>
   *
   * Current exchange trading rules and symbol information<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
   *
   * @param {object} [options]
   * @param {string} [options.symbol] - symbol
   * @param {Array} [options.symbols] - an array of symbols
   *
   */
  products(): Promise<any> {
    return fetch(
      "https://www.binance.com/exchange-api/v2/public/asset-service/product/get-products",
      { method: "GET" }
    );
  }

  async marketCap(symbol?: string): Promise<number> {
    const { data: products } = await (await this.products()).json();
    const symbolMarket = products.find((product: any) => product.s === symbol);
    return symbolMarket.cs * symbolMarket.s;
  }
}

export function getInstance(
  key = "",
  secret = "",
  baseURL?: string
): BinanceSpot {
  return new BinanceSpot(key, secret, baseURL);
}

export type BinanceKline = any[];

export interface CrinKline {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  openTime: Date;
  closeTime: Date;
}

export function parseBinanceKlines(data: BinanceKline[]): CrinKline[] {
  return data.reduce((acc, arr) => {
    if (new Date(arr[6]).getMilliseconds() < Date.now()) {
      return [
        ...acc,
        {
          open: Number(arr[1]),
          close: Number(arr[4]),
          high: Number(arr[2]),
          low: Number(arr[3]),
          volume: Number(arr[5]),
          openTime: new Date(arr[0]),
          closeTime: new Date(arr[6]),
        },
      ];
    }
    return acc;
  }, []);
}

export function getClosesFromBinanceKlines(data: BinanceKline[]): number[] {
  return data.map((arr: any[]) => Number(arr[4]));
}

export function getClosesFromCrinKlines(data: CrinKline[]): number[] {
  return data.map(({ close }) => close);
}
