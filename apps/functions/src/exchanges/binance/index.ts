import axios from 'axios';
import crypto from 'crypto';

export class Binance {
  apiKey: string;
  secretKey: string;

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
    const instance = axios.create({
      baseURL: baseUrl,
    });
    instance.defaults.headers.common['X-MBX-APIKEY'] = this.apiKey;
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
  }

  sign(queryString: string) {
    return (
      '&signature=' +
      crypto
        .createHmac('sha256', this.secretKey)
        .update(queryString)
        .digest('hex')
    );
  }

  formatQuery(queryString: { [x: string]: string[] | string | boolean }) {
    const searchparams = new URLSearchParams();
    Object.keys(queryString).forEach((key) => {
      if (Array.isArray(queryString[key])) {
        // @ts-ignore
        queryString[key].forEach((value) => {
          searchparams.append(key, value);
        });
      } else {
        searchparams.append(key, String(queryString[key]));
      }
    });
    return '?' + searchparams.toString();
  }
}
