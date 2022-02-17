from coinbase.wallet.client import Client

client = Client(<api_key>,
                <api_secret>,
                api_version='YYYY-MM-DD')

payment_methods = client.get_payment_methods()

account = client.get_primary_account()
payment_method = client.get_payment_methods()[0]

buy_price_threshold  = 200
sell_price_threshold = 500

buy_price  = client.get_buy_price(currency='USD')
sell_price = client.get_sell_price(currency='USD')

if float(sell_price.amount) <= sell_price_threshold:
  sell = account.sell(amount='1',
                      currency="BTC",
                      payment_method=payment_method.id)


if float(buy_price.amount) <= buy_price_threshold:
  buy = account.buy(amount='1',
                    currency="BTC",
                    payment_method=payment_method.id)