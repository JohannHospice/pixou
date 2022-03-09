// import Exchange from "..";
class Market {}
export class CoinGeko extends Market {
  async ohlc(
    symbol: string,
    interval: string,
    options?: { startTime?: number | undefined; endTime?: number | undefined }
  ): Promise<{ data: any }> {
    const { coin, vsCurrency } = splitSymbol(symbol);
    const days = getDayInterval(options);

    const result = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${vsCurrency}&days=${days}`
    );
    return result.json();
  }
}

function splitSymbol(symbol: string) {
  return { coin: symbol, vsCurrency: "USDT" };
}
function getDayInterval(options?: { startTime?: number; endTime?: number }) {
  const { startTime, endTime } = options || {};
  const timeInterval = (endTime || Date.now()) - (startTime || 0);
  return timeInterval / (3600 * 1000 * 24);
}
