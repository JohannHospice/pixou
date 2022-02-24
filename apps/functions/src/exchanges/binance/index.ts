import { Spot } from '@binance/connector';

const client = new Spot(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_SECRET_KEY,
  { baseURL: process.env.BINANCE_BASE_URL }
);

// Get account information
client.account().then((response) => client.logger.log(response.data));

// // Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//   price: '350',
//   quantity: 1,
//   timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))

export default client;