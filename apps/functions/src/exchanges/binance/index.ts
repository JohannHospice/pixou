import { Spot } from "@binance/connector";

export const PERIOD_WEEKLY = "1w";

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
