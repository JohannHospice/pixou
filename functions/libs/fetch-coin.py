# %%
import pandas_datareader as pdr
import pandas as pd
import datetime as dt
from dateutil.relativedelta import relativedelta
import os

RSI_PERIOD=14
DAYS_INTERVAL=7
SAVE_DATAFRAME = True
def fetchPrices(symbol, start, end):
    dataframe_directory = 'data'
    if not os.path.exists(dataframe_directory):
        os.mkdir(dataframe_directory)

    pathname = os.path.join(dataframe_directory, symbol + '.' + start.strftime("%d%m%y") + '.' + end.strftime("%d%m%y") + '.csv')   
    try:
        df = pd.read_csv(pathname, index_col='Date')
        df.style.set_caption(symbol)
        return df
    except:
        df = pdr.DataReader(symbol, 'yahoo', start, end)
        df.style.set_caption(symbol)
        if SAVE_DATAFRAME: 
            df.to_csv(pathname)

        return df
     

# %%
import functools
import pandas_ta as pta


class Strategy:
    def __init__(self, prices, days_interval):
        self.prices = prices.drop(prices.index[[i for i in range(len(prices.index)) if i % days_interval != 0]])
        self.days_interval = days_interval
        self.spots = []
        self.buying_spots =[]
        self.selling_spots = []
        self.fake_spots = []

        self.ratios = []
        self.ratio = None

    def build(self):
        pass

    def result(self):
        buying_closes = Strategy.getCloses(self.buying_spots)
        selling_closes = Strategy.getCloses(self.selling_spots)

        min_len = len(selling_closes) if len(buying_closes) > len(selling_closes) else len(buying_closes)

        self.ratios = [selling_closes[i] / buying_closes[i] for i in range(min_len)]
        self.ratio = functools.reduce(lambda x, y: x * y, self.ratios, 1)
        
    def appendSpot(self, array, i):
        return array.append([self.prices.index[i], self.prices.Close[i]])

    def getDates(spots):
        return [a[0] for a in spots]

    def getCloses(spots):
        return [a[1] for a in spots]

import math

class DawnStrategy(Strategy): 
    def __init__(self, prices, days_interval, rsi_period):
        Strategy.__init__(self, prices, days_interval)
        self.rsi_period=rsi_period
        self.prices["Rsi"] = pta.rsi(self.prices.Close, length=rsi_period)
        self.prices["Ema"] = pta.ema(self.prices.Rsi, length=rsi_period)

    def build(self):
        has_bought = False

        for i in range(len(self.prices.index)):
            #  or 
            if not math.isnan(self.prices.Rsi[i]):

                if self.prices.Rsi[i] < 50 and self.isInSellSpot(i):
                    self.appendSpot(self.buying_spots, i)
                # elif self.prices.Rsi[i] < 70:
                #     self.appendSpot(self.buying_spots, i)


                if self.isInBuySpot(i):
                    self.appendSpot(self.spots, i)

                    if not has_bought:
                        # should BUY
                        self.appendSpot(self.buying_spots, i)
                        has_bought = True

                if self.isInSellSpot(i) and has_bought: 
                    # should SELL
                    self.appendSpot(self.selling_spots, i)
                    has_bought = False

                        
    def isInBuySpot(self, i):
        return self.prices.Rsi[i] > self.prices.Ema[i]

    def isInSellSpot(self, i):
        return self.prices.Rsi[i] <= self.prices.Ema[i]



class AllInStrategy(Strategy): 
    def __init__(self, prices):
        Strategy.__init__(self, prices, DAYS_INTERVAL)

    def build(self):
        self.appendSpot(self.buying_spots, 0)
        self.appendSpot(self.selling_spots, len(self.prices.index) - 1)

class AverageInvestingStrategy(Strategy): 
    def __init__(self, prices):
        Strategy.__init__(self, prices, DAYS_INTERVAL)

    def build(self):
        buy_weeks = 4
        sell_weeks = buy_weeks * 6
        closes = []
        for i in range(len(self.prices.index)):
            if i % buy_weeks == 0:
                self.appendSpot(self.buying_spots, i)
                closes.append(self.prices.Close[i])
            if i % sell_weeks == 0 and functools.reduce(lambda x, y: x + y, closes) / len(closes) < self.prices.Close[i]:
                closes = []
                self.appendSpot(self.selling_spots, i)

    def result(self):
        closes = []
        j = 0
        self.ratios= []
        for i in range(len(self.buying_spots)):
            if j < len(self.selling_spots):
                if self.buying_spots[i][0] < self.selling_spots[j][0]:
                    closes.append(self.buying_spots[i][1])
                elif len(closes) > 0:
                    avg = functools.reduce(lambda x, y: x + y, closes, 0) / len(closes)
                    self.ratios.append(self.selling_spots[j][1] / avg)

                    j += 1
                    closes = []

        self.ratio = functools.reduce(lambda x, y: x * y, self.ratios, 1)

def perform_strategy(Strategy, *params):
    strategy = Strategy(*params)
    strategy.build()
    strategy.result()
    return strategy
# %%

import plotly.offline as py
import plotly.graph_objs as go
import plotly.express as px

class Plot:
    def __init__(self):
        py.init_notebook_mode(connected=True)
        pass
    # , yaxis=dict(range=[30,70])
    def strategyRsi(self, strategy, title):
        strategy.prices['UpperBand'] = [70 for i in range(len(strategy.prices.Rsi))]
        strategy.prices['LowerBand'] = [30 for i in range(len(strategy.prices.Rsi))]
        strategy.prices['MiddleBand'] = [50 for i in range(len(strategy.prices.Rsi))]
        px.line(strategy.prices, y=["Rsi", "Ema", 'UpperBand', 'LowerBand', 'MiddleBand'], title=title).show()

    def strategy(self, strategy, title):
        strategy_prices_dropped = strategy.prices.drop(strategy.prices.index[range(strategy.rsi_period)])
        Plot.iplot([
            go.Scatter(x=strategy_prices_dropped.Close.index, y=strategy_prices_dropped.Close, name=strategy_prices_dropped.style.caption),
            Plot.getDots(strategy.spots, "green", "Spots"),
            Plot.getDots(strategy.buying_spots, 'blue', "Buying spots"),
            Plot.getDots(strategy.selling_spots, 'red', "Selling spots"),
            # Plot.getScatter(strategy.fake_spots, 'violet', "Fake spots"),
        ], title)

    def strategyBase(self, strategy, title):
        Plot.iplot([
            go.Scatter(x=strategy.prices.index, y=strategy.prices.Close, name=strategy.prices.style.caption),
            Plot.getDots(strategy.buying_spots, "blue", "Buying spots"),
            Plot.getDots(strategy.selling_spots, "red", "Selling spots"),
        ], title)

    def getDots(strategy_spots, strategy_color, name):
        scatter = go.Scatter(x=Strategy.getDates(strategy_spots), y=Strategy.getCloses(strategy_spots), mode='markers', marker=dict(size=5, color=strategy_color), name=name),
        return scatter[0]

    def iplot(data, title):
        py.iplot(
            go.Figure(
                data=data,
                layout=go.Layout(title=title, yaxis={'type': 'log'}, xaxis={'rangeslider':{'visible':False}})), 
            filename=title.lower().replace(' ', '_'))

# %%
import json
class Profile:
    def __init__(self, strategy, interval, money_per_interval, cashout=False):
        self.money_per_interval = money_per_interval
        self.interval = interval
        self.strategy = strategy
        self.capital = 0
        self.fiat = 0
        self.coins = 0
        self.money_injected = 0
        self.cashout = cashout

    def perform(self):
        # moment ou on reserve
        accumulation_spots = []
        for i, j_date in enumerate(self.strategy.prices.index):
            if i % self.interval == 0:
                accumulation_spots.append((j_date, self.money_per_interval))
                self.money_injected += self.money_per_interval
        
        self.fiat = 0
        self.fiat_accumulator = 0
        self.coins = 0

        transactions = to_transaction_list(accumulation_spots, self.strategy.buying_spots, self.strategy.selling_spots)

        for transaction in transactions:
            # print(self.fiat_accumulator, self.fiat, self.coins)
            if transaction[2] == 'ACC':
                self.fiat_accumulator += transaction[1]
            if transaction[2] == 'BUY':
                coin = self.buy_coin(transaction[1])
                self.coins += coin
            if transaction[2] == 'SELL':
                if not self.cashout:
                    self.fiat += self.sell_coin(transaction[1])
                else:
                    self.fiat_accumulator += self.sell_coin(transaction[1])

    def buy_coin(self, coin_value):
        fiat_accumulator_tmp = self.fiat_accumulator
        self.fiat_accumulator = 0
        return fiat_accumulator_tmp / coin_value

    def sell_coin(self, coin_value):
        coins_tmp = self.coins
        self.coins = 0
        return coins_tmp * coin_value  
    
    def print(self):
        total = round(self.fiat + self.fiat_accumulator + self.coins * self.strategy.prices.Close[len(self.strategy.prices.Close) - 1], 2)
        print(json.dumps({
            "coins": self.coins,
            "interval_money": self.money_per_interval,
            "interval_days": self.interval * self.strategy.days_interval,
            "fiat": self.fiat + self.fiat_accumulator,
            "money_output": total,
            "money_input": self.money_injected,
            "rato": total / self.money_injected,
            # "ratios": self.strategy.ratios,
        }, indent=4, sort_keys=True))

def to_transaction_list(reserve_spots, buying_spots, selling_spots):
    transactions = (
        list(map(lambda spot: (spot[0], spot[1], 'ACC'), reserve_spots))
            + list(map(lambda spot: (spot[0], spot[1], 'BUY'), buying_spots))
            + list(map(lambda spot: (spot[0], spot[1], 'SELL'), selling_spots)) 
            )
    transactions.sort(key=lambda spot: spot[0])
    return transactions

def perform_profile(*params):
    profile = Profile(*params)
    profile.perform()
    profile.print()

# %%
YEARS = 3
YEAR_DAYS = 365
SYMBOLE = 'BTC-USD'
days_timeperiod = 10
fetched_prices = fetchPrices(SYMBOLE, dt.datetime.now() - relativedelta(years=YEARS - 1 if YEARS >= 1 else 0 , days=YEAR_DAYS + RSI_PERIOD*days_timeperiod), dt.datetime.now() - relativedelta(days=5))

dawnStrategy = perform_strategy(DawnStrategy, fetched_prices, days_timeperiod, RSI_PERIOD)
# allInStrategy = perform_strategy(AllInStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*days_selected)]]))
# aiStrategy = perform_strategy(AverageInvestingStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*days_timeperiod)]]))

# print({"dawnStrategy": dawnStrategy.ratio, "allInStrategy": allInStrategy.ratio, "aiStrategy": aiStrategy.ratio})

plot = Plot()
plot.strategyRsi(dawnStrategy, "Rsi + Ema")
plot.strategy(dawnStrategy, "Dawn Strategy")

# plot.strategyBase(allInStrategy, "All-In Strategy")
# plot.strategyBase(aiStrategy, "Average Investing Strategy")
print("coin_name : " + SYMBOLE)
print("years : " + str(YEARS))
perform_profile(dawnStrategy, 3, 1000, True)
# perform_profile(aiStrategy, 3, 1500)


# %%
