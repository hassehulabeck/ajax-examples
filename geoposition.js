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

    function renderSunset() {
        sunsetSunrise.innerHTML = `
        <p>Solen går upp: ${sunsetRes.results.sunrise}</p>
        <p>Solen går ned: ${sunsetRes.results.sunset}</p>
        `;
    }
})