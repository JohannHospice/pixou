import { Spot } from "@binance/connector";

export function getInstance({ key, secret, baseURL }: any) {
  const client = new Spot(key, secret, { baseURL });

  return client;
}

// // Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//   price: '350',
//   quantity: 1,
//   timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))
