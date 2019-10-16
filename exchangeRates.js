var xhr = new XMLHttpRequest;
var url = "https://api.exchangeratesapi.io/latest?base=";
var base = "SEK";

document.addEventListener("DOMContentLoaded", function () {
    var lista = document.getElementsByTagName("ul");
    var select = document.getElementById("valuta");

    function populateSelect() {
        for (rate in exchangeRates.rates) {
            var option = document.createElement("option");
            option.value = rate;
            option.innerText = rate;
            select.appendChild(option);
        }
    }

    xhr.onreadystatechange = function () {

        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            exchangeRates = xhr.response;
            lista[0].innerHTML = "";
            populateSelect();

            // Loopa igenom responsens rates.
            for (egenskap in exchangeRates.rates) {
                let li = document.createElement("li");
                li.innerHTML = egenskap + ": " + exchangeRates.rates[egenskap];
                lista[0].appendChild(li);
            }
        }

    }

    select.addEventListener("change", function (e) {
        var valuta = e;
        console.log(valuta.target.value);
        base = valuta.target.value;
        getData();
    })
})
var exchangeRates;

function getData() {
    xhr.open("GET", url + base);
    xhr.responseType = "json";
    xhr.send();
}

getData();