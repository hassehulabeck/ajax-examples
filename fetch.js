var res;

fetch("https://www.hulabeck.se/html/temp/products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (myRes) {
        res = myRes;
    })