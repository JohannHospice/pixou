export = APIBase;
declare class APIBase {
    constructor(options: any);
    apiKey: any;
    apiSecret: any;
    baseURL: any;
    logger: any;
    publicRequest(method: any, path: any, params?: {}): any;
    signRequest(method: any, path: any, params?: {}): any;
}
