declare module "@binance/connector" {
  export class Spot {
    constructor(key: string, secret: string, options: { [x: string]: string });

    [x: string]: any;
  }
}
