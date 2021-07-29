
import aiohttp
import asyncio
import pandas as pd


dataset = pd.read_csv(r'app/data/Equity.csv')
STOCKS = dataset['Issuer Name']
STOCKS = STOCKS[:500]
header = {'User': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0'}
DATA = []
async def get_stock_data(session, bseid):
    global DATA
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{bseid}.BO?region=IN&lang=en-IN&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=in.finance.yahoo.com&.tsrc=finance"
    async with session.get(url) as response:        
        res = await response.json()
        try:
            LTP = res['chart']['result'][0]['meta']['regularMarketPrice']
            pc = round(float((res['chart']['result'][0]['meta']['regularMarketPrice'] - res['chart']['result'][0]['meta']['previousClose'])
                        / res['chart']['result'][0]['meta']['previousClose'] * 100 ),2)
            c = round(float(res['chart']['result'][0]['meta']['regularMarketPrice'] - res['chart']['result'][0]['meta']['previousClose']),2)
            x = {'Name':bseid,'Rate':LTP,'Change':c,'PChange':pc}
            DATA.append(x)
        except Exception as e:
            pass
  

async def get_top_10_movers():
    global DATA
    async with aiohttp.ClientSession() as session:
        tasks = []
        DATA = []
        for bseid in STOCKS:
            task = asyncio.ensure_future(get_stock_data(session, bseid))
            tasks.append(task)

        await asyncio.gather(*tasks)
        stock_list = sorted(DATA, key=lambda k: k['PChange'])
        return stock_list[:10], stock_list[-10:][::-1]