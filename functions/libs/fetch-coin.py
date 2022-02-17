import pandas_datareader as pdr
import datetime as dt



start = dt.datetime(2020,1,1)
end = dt.datetime.now()

ltc = pdr.DataReader('BTC-USD', 'yahoo', start, end)
print(ltc.tail())

import plotly.offline as py
import plotly.graph_objs as go

py.init_notebook_mode(connected=True)
data = [go.Candlestick(x=ltc.index,
    open=ltc.Open,
    high=ltc.High,
    low=ltc.Low,
    close=ltc.Close)]

layout = go.Layout(title='Bitcoin Candlestick with Range Slider',
    xaxis={'rangeslider':{'visible':True}})

fig = go.Figure(data=data,layout=layout)

py.iplot(fig,filename='bitcoin_candlestick')

xaxis = {'rangeselector':{'buttons':[{'count':1,
    'label':'1m',
    'step':'month',
    'stepmode': 'backward'}]}}
