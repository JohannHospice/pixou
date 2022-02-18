# %%
import pandas_datareader as pdr
import datetime as dt
from dateutil.relativedelta import relativedelta

RSI_PERIOD=14
DAYS_INTERVAL=7

start = dt.datetime.now() - relativedelta(years=3, days=RSI_PERIOD*DAYS_INTERVAL)
end = dt.datetime.now()
fetched_prices = pdr.DataReader('BTC-USD', 'yahoo', start, end)

# %%
import functools
import pandas_ta as pta

import plotly.offline as py
import plotly.graph_objs as go

py.init_notebook_mode(connected=True)

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

    def getSpots(self):
        return {
            'spots': self.spots,
            'buying_spots': self.buying_spots,
            'selling_spots': self.selling_spots,
            'fake_spots': self.fake_spots,
        }
    def plot(self):

        py.iplot(
            go.Figure(
                data=[
                    go.Line(x=self.prices.index, y=self.prices.Close),
                    go.Scatter(x=Strategy.getDates(self.buying_spots), y=Strategy.getCloses(self.buying_spots), mode='markers', marker=dict(size=5, color='blue')),
                    go.Scatter(x=Strategy.getDates(self.selling_spots), y=Strategy.getCloses(self.selling_spots), mode='markers', marker=dict(size=5, color='red')),
                ],
                layout=go.Layout(title='Strategy', yaxis={'type': 'log'}, xaxis={'rangeslider':{'visible':False}})), 
            filename='strat')
import math

import plotly.offline as py
import plotly.graph_objs as go
import plotly.express as px

class DawnStrategy(Strategy): 
    def __init__(self, prices, days_interval, rsi_period):
        Strategy.__init__(self, prices, days_interval)
        self.prices["Rsi"] = pta.rsi(self.prices.Close, length=rsi_period)
        self.prices["Ema"] = pta.ema(self.prices.Rsi, length=rsi_period)

    def build(self):
        has_bought = False

        ## IL est décalé !
        for i in range(len(self.prices.index)):
            if i > 0 and not math.isnan(self.prices.Rsi[i]):
                current_i = i - 1
                next_i = i
                
                if self.isInBuySpot(current_i):
                    self.appendSpot(self.spots, current_i)
                    has_bought_now = False

                    if not has_bought:
                        # should BUY
                        self.appendSpot(self.buying_spots, current_i)
                        has_bought = True
                        has_bought_now = True

                    if self.isInSellSpot(next_i):
                        # should SELL
                        self.appendSpot(self.selling_spots, current_i)
                        has_bought = False

                        # BUY and SELL same day
                        if has_bought_now:
                            self.appendSpot(self.fake_spots, current_i)
                        
    def isInBuySpot(self, i):
        return self.prices.Rsi[i] > self.prices.Ema[i]

    def isInSellSpot(self, i):
        return self.prices.Rsi[i] <= self.prices.Ema[i]

    def plot(self):
        def getScatter(strategy_spots, strategy_color):
            scatter = go.Scatter(x=Strategy.getDates(strategy_spots), y=Strategy.getCloses(strategy_spots), mode='markers', marker=dict(size=5, color=strategy_color)),
            return scatter[0]

        py.iplot(
            go.Figure(
                data=[
                    go.Line(x=self.prices.Close.index, y=self.prices.Close),
                    getScatter(self.spots, "green"),
                    getScatter(self.buying_spots, 'blue'),
                    getScatter(self.selling_spots, 'red'),
                    getScatter(self.fake_spots, 'violet'),
                ],
                layout=go.Layout(title='Bitcoin Candlestick with Range Slider', yaxis={'type': 'log'}, xaxis={'rangeslider':{'visible':False}})), 
            filename='bitcoin_candlestick')


        # px.line(self.prices, y=["Rsi", "Ema"], title="Bitcoin RSI and EMA").show()

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

# %%
def perform_strategy(Strategy, *params):
    strategy = Strategy(*params)
    strategy.build()
    strategy.result()
    return strategy
    # perform_strategy(AllInStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD)]])),
# res = [
#     [i, perform_strategy(DawnStrategy, fetched_prices, i, RSI_PERIOD)] for i in range(1, 30)
# ]
# print(res)

dawnStrategy = perform_strategy(DawnStrategy, fetched_prices, DAYS_INTERVAL, RSI_PERIOD)
allInStrategy = perform_strategy(AllInStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*DAYS_INTERVAL)]]))
aiStrategy = perform_strategy(AverageInvestingStrategy, fetched_prices.drop(fetched_prices.index[[i for i in range(RSI_PERIOD*DAYS_INTERVAL)]]))

print([dawnStrategy.ratio, allInStrategy.ratio, aiStrategy.ratio])

# %%
dawnStrategy.plot()
allInStrategy.plot()
aiStrategy.plot()

# %%
