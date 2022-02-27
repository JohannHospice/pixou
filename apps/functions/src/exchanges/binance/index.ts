import { Spot } from "@binance/connector";

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
export function getInstance(
  key: string = "",
  secret: string = "",
  baseURL?: string
): Spot {
  return new Spot(key, secret, { baseURL });
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
