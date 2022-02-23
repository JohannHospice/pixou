import axios from 'axios';
import crypto from 'crypto';
import qs from 'querystring';
import 'dotenv';
const secrets = {
  binanceApiKey: process.env.BINANCE_API_KEY,
  binanceSecretKey: process.env.BINANCE_SECRET_KEY,
  binanceBaseURL: process.env.BINANCE_API_URL,
};

const instance = axios.create({
  baseURL: secrets.binanceBaseURL,
});
instance.defaults.headers.common['X-MBX-APIKEY'] = secrets.binanceApiKey;
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

function sign(queryString) {
  return (
    '&signature=' +
    crypto
      .createHmac('sha256', secrets.binanceSecretKey)
      .update(queryString)
      .digest('hex')
  );
}

function formatQuery(queryString) {
  return '?' + qs.stringify(queryString);
}
