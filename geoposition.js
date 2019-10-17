var pos = {
    lat: 0,
    long: 0
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        pos.lat = position.coords.latitude;
        pos.long = position.coords.longitude;
        var posref = document.getElementById("pos");
        posref.innerHTML = "<h1>" + pos.lat + " " + pos.long;
    });
} else {
    console.log("Din enhet tillåter inte platstjänster.")
}