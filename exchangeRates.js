var xhr = new XMLHttpRequest;
var exchangeRates;

// Dela upp url:en i en fast del (url) och en dynamisk (base)
var url = "https://api.exchangeratesapi.io/latest?base=";
var base = "SEK";

document.addEventListener("DOMContentLoaded", function () {
    var lista = document.getElementsByTagName("ul");
    var select = document.getElementById("valuta");

    function populateSelect() {
        // Gå igenom objektet rates, en valuta(rate) i taget.
        for (rate in exchangeRates.rates) {
            var option = document.createElement("option");
            // Lägg in valutan som value i optionen.
            option.value = rate;
            // Lägg också in den som text innanför elementets taggar.
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
        // Tilldela base värdet av den option i dropdownen vi valt.
        base = e.target.value;
        // Anropa url för att få fräsch data.
        getData();
    })
})

function getData() {
    xhr.open("GET", url + base);
    xhr.responseType = "json";
    xhr.send();
}

// Börja med att anropa url för att få data.
getData();