export = GiftCard;
/**
 * API Gift Card Endpoints
 * @module GiftCard
 * @param {*} superclass
 */
declare function GiftCard(superclass: any): {
    new (): {
        [x: string]: any;
        /**
          * Create a Binance Code (USER_DATA)<br>
          *
          * POST /sapi/v1/giftcard/createCode<br>
          *
          * {@link https://binance-docs.github.io/apidocs/spot/en/#create-a-binance-code-user_data}
          *
          * @param {string} token - The coin type contained in the Binance Code
          * @param {number} amount - The amount of the coin
          * @param {object} [options]
          * @param {number} [options.recvWindow] - The value cannot be greater than 60000
          */
        giftCardCreateCode(token: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
          * Redeem a Binance Code (USER_DATA)<br>
          *
          * POST /sapi/v1/giftcard/redeemCode<br>
          *
          * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-a-binance-code-user_data}
          *
          * @param {string} code - Binance Code
          * @param {object} [options]
          * @param {number} [options.recvWindow] - The value cannot be greater than 60000
          */
        giftCardRedeemCode(code: string, options?: {
            recvWindow?: number;
        }): any;
        /**
          * Verify a Binance Code (USER_DATA)<br>
          *
          * GET /sapi/v1/giftcard/verify<br>
          *
          * {@link https://binance-docs.github.io/apidocs/spot/en/#verify-a-binance-code-user_data}
          *
          * @param {string} referenceNo - reference number
          * @param {object} [options]
          * @param {number} [options.recvWindow] - The value cannot be greater than 60000
          */
        giftCardVerifyCode(referenceNo: string, options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
