var sunsetRes;
var pos = {
    lat: 0,
    long: 0
};
var url = "https://api.sunrise-sunset.org/json?"
//lat=36.7201600&lng=-4.4203400

document.addEventListener("DOMContentLoaded", function () {
    var posref = document.getElementById("pos");
    var sunsetSunrise = document.getElementById("sunsetSunrise");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos.lat = position.coords.latitude;
            pos.long = position.coords.longitude;
            posref.innerHTML = "<h1>" + pos.lat + " " + pos.long;

            // Hämta data från sunset/sunrise
            url += "lat=" + pos.lat + "&lng=" + pos.long;
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (resJson) {
                    sunsetRes = resJson;
                    renderSunset();
                })
                .catch(function (error) {
                    console.log("Error: " + error)
                })
        });
    } else {
        console.log("Din enhet tillåter inte platstjänster.")
    }

})

function renderSunset() {
    fixTime();
    // Skriv ut resultatet enligt det format vi har i Sverige
    sunsetSunrise.innerHTML = `
        <p>Solen går upp: ${sunsetRes.results.sunrise.toLocaleTimeString("SV-se")}</p>
        <p>Solen går ned: ${sunsetRes.results.sunset.toLocaleTimeString("SV-se")}</p>
        `;
}

function fixTime() {
    // Skapa ett nytt datumobjekt, med dagens datum.
    var idag = new Date();
    // Omvandla detta till strängvärde för datument, exempelvis "2019-10-17"
    idag = idag.toDateString();

    // Plocka ut klockslaget.
    var tid = sunsetRes.results.sunrise;

    // Omvandla UTC-tiden till vår lokala tid med sommartid och annat.
    sunsetRes.results.sunrise = new Date(idag + " " + tid + " UTC");
    console.log(sunsetRes.results.sunrise);

    var tid = sunsetRes.results.sunset;

    // Omvandla UTC-tiden till vår lokala tid med sommartid och annat.
    sunsetRes.results.sunset = new Date(idag + " " + tid + " UTC");
    console.log(sunsetRes.results.sunset);
}