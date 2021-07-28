var stocksData = [];

$(document).ready(function() {
    // executes when HTML-Document is loaded and DOM is ready
    getStocksData()
   });


function getStocksData(){
    let array = new Array;
    let fetches = []
    for(let stock of STOCKS){
        fetches.push(fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock['Issuer Name']}.BO?region=IN&lang=en-IN`)
        .then(res=>{
            if (res.status != 200){
                return Promise.reject(400)
            }
            else{
                return res.json()
            }
        })
        .then(data=>{
            data['Name'] = stock['Security Code']
            data['Symbol'] = stock['Issuer Name']
            stocksData.push(data)
        })
        .catch(err=>{
            console.log(err)
        }))
    }
    
    Promise.all(fetches).then(function() {
        renderStockData()
    });
}

function renderStockData(){
    document.querySelector('#load').remove()
    document.querySelector('#top10Gainers').innerHTML = `
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Top 10 Gainers</h3>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead class="text-primary">
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody class="top10Gainers">
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>`

    document.querySelector('#top10Losers').innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Top 10 Losers</h3>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead class="text-primary">
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody class="top10Losers">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`

    for (let stock of stocksData) {
        if (stock['chart']['result'][0]['meta']['regularMarketPrice'] == undefined || stock['chart']['result'][0]['meta']['previousClose'] == undefined){
            stocksData.splice(stocksData.indexOf(stock),1)      
        }
    }
    for (let stock of stocksData){
        let priceChange = stock['chart']['result'][0]['meta']['regularMarketPrice'] - stock['chart']['result'][0]['meta']['previousClose']
        let percentChange = parseFloat(((priceChange.toFixed(2) / stock['chart']['result'][0]['meta']['previousClose']) * 100).toFixed(2))
        stock['Percent Change'] = percentChange
    }
    stocksData.sort(function(a, b){return a['Percent Change'] - b['Percent Change']});
    for(let stock of stocksData.slice(-10)){
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${stock['Symbol']}</td>
        <td>${stock['Name']}</td>
        <td>${stock['chart']['result'][0]['meta']['regularMarketPrice']}</td>
        <td>${stock['Percent Change']}</td>`
        document.querySelector('.top10Gainers').appendChild(tr)
    }
      

    for(let stock of stocksData.slice(0, 10)){
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${stock['Symbol']}</td>
        <td>${stock['Name']}</td>
        <td>${stock['chart']['result'][0]['meta']['regularMarketPrice']}</td>
        <td>${stock['Percent Change']}</td>`
        document.querySelector('.top10Losers').appendChild(tr)
    }
}