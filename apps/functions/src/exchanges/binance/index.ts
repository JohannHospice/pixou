import { Spot } from "@binance/connector";
import fs from "fs";
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
const TIME_INTERVAL: { [x: string]: number } = {
  "3d": 3600 * 1000 * 24 * 3,
};
class BinanceSpot extends Spot {
  dirname: string = "./build/klines";
  constructor(key: string = "", secret: string = "", baseURL?: string) {
    super(key, secret, { baseURL });
  }

  async klines(
    symbol: string,
    interval: string,
    options?: {
      startTime?: number | undefined;
      endTime?: number | undefined;
    }
  ) {
    try {
      const klines = await this.readKlines(symbol, interval, options);
      return klines;
    } catch (error) {
      console.error(error);
      return this.fetchKlines(symbol, interval, options);
    }
  }

  async fetchKlines(
    symbol: string,
    interval: string,
    options?: {
      startTime?: number | undefined;
      endTime?: number | undefined;
    }
  ) {
    const { data } = await super.klines(symbol, interval, {
      ...options,
      limit: 1000,
    });

    if (!fs.existsSync(this.dirname)) {
      fs.mkdirSync(this.dirname);
    }

    this.writeKlines(symbol, interval, data);

    return { data };
  }

  writeKlines(symbol: string, interval: string, data: any[]) {
    const filename = this.getFileName(symbol, interval);
    let dataToWrite = data;

    if (fs.existsSync(filename)) {
      dataToWrite = JSON.parse(fs.readFileSync(filename, "utf-8"));

      data.forEach((element: any[]) => {
        if (!dataToWrite.some((up: any[]) => up[0] === element[0])) {
          dataToWrite.push(element);
        }
      });
    }

    fs.writeFileSync(filename, JSON.stringify(dataToWrite));
  }

  async readKlines(
    symbol: string,
    interval: string,
    options?: {
      startTime?: number | undefined;
      endTime?: number | undefined;
    }
  ) {
    const klines = JSON.parse(
      fs.readFileSync(this.getFileName(symbol, interval), "utf-8")
    );

    if (
      (options?.endTime &&
        options?.endTime >
          klines[klines.length - 1][0] + TIME_INTERVAL[interval]) ||
      (options?.startTime && options?.startTime < klines[0][0])
    ) {
      throw {
        message: "Data need to be updated",
        data: {
          endTime: options?.endTime,
          startTime: options?.startTime,
          first: klines[0][0],
          last: klines[klines.length - 1][0],
        },
      };
    }

    return {
      data: klines.filter((kline: any) => {
        let inBound = true;
        if (options?.startTime) inBound = options?.startTime < kline[0];
        if (options?.endTime) inBound = options?.endTime > kline[0] && inBound;
        return inBound;
      }),
    };
  }

  getFileName(symbol: string, interval: string) {
    return `${this.dirname}/${symbol}-${interval}.json`;
  }
}

export function getInstance(
  key: string = "",
  secret: string = "",
  baseURL?: string
): Spot {
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
  return data.map((arr) => ({
    open: Number(arr[1]),
    close: Number(arr[4]),
    high: Number(arr[2]),
    low: Number(arr[3]),
    volume: Number(arr[5]),
    openTime: new Date(arr[0]),
    closeTime: new Date(arr[6]),
  }));
}

export function getClosesFromBinanceKlines(data: BinanceKline[]): number[] {
  return data.map((arr: any[]) => Number(arr[4]));
}

export function getClosesFromCrinKlines(data: CrinKline[]): number[] {
  return data.map(({ close }) => close);
}
