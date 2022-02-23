# %%
from dotenv import load_dotenv
load_dotenv()

from alpaca_trade_api.rest import REST, TimeFrame

api = REST()

def get_data(symbol, timeframe, start, end):
    return api.get_bars(symbol, timeframe, start, end, adjustment='raw')

prices = get_data('BTCUSD', TimeFrame.Day, "2022-01-08", "2022-01-15")

print(prices)
