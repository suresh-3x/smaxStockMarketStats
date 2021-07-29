function  getStocksData(){
    fetch('/home', {
        method: 'POST'
    })
    .then(res=>res.text())
    .then(html=>document.getElementsByTagName("html")[0].innerHTML = html)
    .catch(err=>console.log())
}

getStocksData()