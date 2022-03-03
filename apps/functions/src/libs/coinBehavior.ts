import Exchange from "./exchanges";
import { BinanceSpot, TIME_PERIOD } from "./exchanges/binance";
import Strategy from "./strategies";
import SuperIchimokuStrategy from "./strategies/superichimoku";

export function getCoinBehaviors(): CoinBehavior[] {
  const now = Date.now();
  const dayInTime = 1000 * 3600 * 24;
  return [
    {
      symbole: "BTCUSDT",
      interval: TIME_PERIOD.THREE_DAILY,
      options: {
        startTime: now,
        endTime: now - dayInTime * 7,
      },
      Strategy: SuperIchimokuStrategy,
      spot: new BinanceSpot(),
      exchange: new BinanceSpot(
        process.env.BINANCE_API_KEY,
        process.env.BINANCE_SECRET_KEY,
        process.env.BINANCE_API_URL
      ),
    },
  ];
}

export async function getActionFromBehavior({
  symbole,
  interval,
  options,
  Strategy,
  spot,
}: CoinBehavior) {
  const { data: klines } = await spot.klines(symbole, interval, options);
  const strategy = new Strategy(klines);
  return strategy.getOrder(klines.length - 1);
}

export interface CoinBehavior {
  symbole: string;
  interval: TIME_PERIOD;
  options: {
    startTime: number;
    endTime: number;
  };
  Strategy: typeof Strategy;
  spot: Exchange;
  exchange: Exchange;
}
