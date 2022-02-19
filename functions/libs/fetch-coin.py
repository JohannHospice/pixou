# %%
import pandas_datareader as pdr
import datetime as dt
from dateutil.relativedelta import relativedelta

RSI_PERIOD=14
DAYS_INTERVAL=7

def fetchPrices(symbol, start, end):
    fetch = pdr.DataReader(symbol, 'yahoo', start, end)
    fetch.style.set_caption(symbol)
    return fetch
     

# %%
import functools
import pandas_ta as pta


class Strategy:
    def __init__(self, prices, days_interval):
        self.prices = prices.drop(prices.index[[i for i in range(len(prices.index)) if i % days_interval != 0]])
        
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
        self.prices["Rsi"] = pta.rsi(self.prices.Close, length=rsi_period)
        self.prices["Ema"] = pta.ema(self.prices.Rsi, length=rsi_period)

    def build(self):
        has_bought = False

        for i in range(len(self.prices.index)):
            if i > 0 and not math.isnan(self.prices.Rsi[i]):
                has_bought_now = False

                if self.isInBuySpot(i):
                    self.appendSpot(self.spots, i)

                    if not has_bought:
                        # should BUY
                        self.appendSpot(self.buying_spots, i)
                        has_bought = True
                        has_bought_now = True

                if self.isInSellSpot(i) and has_bought: 
                    # should SELL
                    self.appendSpot(self.selling_spots, i)
                    has_bought = False

                    # BUY and SELL same day
                    if has_bought_now:
                        self.appendSpot(self.fake_spots, i)
                        
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

    def strategyRsi(self, strategy, title):
        px.line(strategy.prices, y=["Rsi", "Ema"], title=title).show()

    def strategy(self, strategy, title):
        Plot.iplot([
            go.Line(x=strategy.prices.Close.index, y=strategy.prices.Close, name=strategy.prices.style.caption),
            Plot.getScatter(strategy.spots, "green", "Spots"),
            Plot.getScatter(strategy.buying_spots, 'blue', "Buying spots"),
            Plot.getScatter(strategy.selling_spots, 'red', "Selling spots"),
            Plot.getScatter(strategy.fake_spots, 'violet', "Fake spots"),
        ], title)

    def strategyBase(self, strategy, title):
        Plot.iplot([
            go.Line(x=strategy.prices.index, y=strategy.prices.Close, name=strategy.prices.style.caption),
            Plot.getScatter(strategy.buying_spots, "blue", "Buying spots"),
            Plot.getScatter(strategy.selling_spots, "red", "Selling spots"),
        ], title)

    def getScatter(strategy_spots, strategy_color, name):
        scatter = go.Scatter(x=Strategy.getDates(strategy_spots), y=Strategy.getCloses(strategy_spots), mode='markers', marker=dict(size=5, color=strategy_color), name=name),
        return scatter[0]

    def iplot(data, title):
        py.iplot(
            go.Figure(
                data=data,
                layout=go.Layout(title=title, yaxis={'type': 'log'}, xaxis={'rangeslider':{'visible':False}})), 
            filename=title.lower().replace(' ', '_'))

# %%

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
                self.fiat_accumulator = 0
                self.coins += coin
            if transaction[2] == 'SELL':
                if not self.cashout:
                    self.fiat += self.sell_coin(transaction[1])
                else:
                    self.fiat_accumulator += self.sell_coin(transaction[1])

                self.coins = 0
                self.coins -= self.coins
              
    def buy_coin(self, coin_value):
        return self.fiat_accumulator / coin_value

    def sell_coin(self, coin_value):
        return self.coins * coin_value  
    
    def print(self):
        print({
            "coins": self.coins,
            "fiat": self.fiat + self.fiat_accumulator,
            "money_injected": self.money_injected,
            "rato": (self.fiat + self.fiat_accumulator) / self.money_injected
        })

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
YEARS = 4
fetched_prices = fetchPrices('BTC-USD', dt.datetime.now() - relativedelta(years=0, days=YEARS*365 + RSI_PERIOD*DAYS_INTERVAL), dt.datetime.now() - relativedelta(days=1))

dawnStrategy = perform_strategy(DawnStrategy, fetched_prices, DAYS_INTERVAL, RSI_PERIOD)
allInStrategy = perform_strategy(AllInStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*DAYS_INTERVAL)]]))
aiStrategy = perform_strategy(AverageInvestingStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*DAYS_INTERVAL)]]))

print({"dawnStrategy": dawnStrategy.ratio, "allInStrategy": allInStrategy.ratio, "aiStrategy": aiStrategy.ratio})

plot = Plot()
plot.strategyRsi(dawnStrategy, "Rsi + Ema")
plot.strategy(dawnStrategy, "Dawn Strategy")
plot.strategyBase(allInStrategy, "All-In Strategy")
plot.strategyBase(aiStrategy, "Average Investing Strategy")

perform_profile(dawnStrategy, 4, 100, True)
perform_profile(aiStrategy, 4, 100)


# %%
