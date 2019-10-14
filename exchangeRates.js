var xhr = new XMLHttpRequest;
var lista = document.getElementsByTagName("ul");
var exchangeRates;

xhr.onreadystatechange = function () {

    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        exchangeRates = xhr.response;

        // Loopa igenom responsens rates.
        for (egenskap in exchangeRates.rates) {
            let li = document.createElement("li");
            li.innerHTML = egenskap + ": " + exchangeRates.rates[egenskap];
            lista[0].appendChild(li);
        }
    }

}

xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=SEK");
xhr.responseType = "json";
xhr.send();