function  getStocksData(){
    let now = performance.now()
    fetch('/home', {
        method: 'POST'
    })
    .then(res=>res.text())
    .then(html=>{
        document.getElementsByTagName("html")[0].innerHTML = html;
        let end = performance.now()
        console.log(`Results fetched in ${(end-now).toFixed(2)}`)
    })
    .catch(err=>console.log())
}

if (window.location.pathname == '/home' || window.location.pathname == '/'){
    getStocksData()
}

if (window.location.pathname == '/stock-finder'){
    document.getElementById("stockFinderForm").addEventListener('submit', (e)=>{
        e.preventDefault()
        let form = document.getElementById("stockFinderForm")
        document.querySelector('.row').innerHTML = `
        <div class="col-lg-4">
        </div>

        <div class="col-lg-4">
            <div class="col" id="loading">
                <img class="loading"src="https://cdn.dribbble.com/users/241526/screenshots/954930/loader.gif" alt="Loading">
            </div>
        </div>
        
        <div class="col-lg-4">
        </div>`
        let now = performance.now()
        fetch('/stock-finder', {
            method: "POST",
            body: new FormData(form)
        })
        .then(res=>res.text())
        .then(html=>{
            document.getElementsByTagName("html")[0].innerHTML = html
            let end = performance.now()
            console.log(`Results fetched in ${(end-now).toFixed(2)}`)
        })
        .catch(err=>console.log())
    })
}
