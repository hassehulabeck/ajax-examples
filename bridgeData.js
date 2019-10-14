var uri = "http://data.goteborg.se/BridgeService/v1.0/GetGABOpenedStatus/DIN-API-KEY/2019-01-01/2019-01-31?format=json";
var data;
var tbody;

fetch(uri)
    .then(function (response) {
        return response.json()
    })
    .then(function (myJson) {
        data = myJson;
        prepareData();
    })


function prepareData() {
    var timeStr;
    data.forEach(function (event, index) {
        var startPosition = event.TimeStamp.indexOf("(");
        var endPosition = event.TimeStamp.indexOf(")");
        var unixTime = event.TimeStamp.slice(startPosition + 1, endPosition);
        var time = new Date(parseInt(unixTime));
        timeStr += "<td>" + time.toDateString() + " " + time.toTimeString() + "</td>";
        if (index % 2 == 0) {
            render(timeStr);
            timeStr = "";
        }
    });
}

function render(timeStr) {
    var tr = document.createElement("tr");
    tr.innerHTML = timeStr + "</tr>";
    tbody[0].appendChild(tr);
}

document.addEventListener("DOMContentLoaded", function () {
    tbody = document.getElementsByTagName("tbody");
})