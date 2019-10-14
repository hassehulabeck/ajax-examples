var res;

fetch("https://www.hulabeck.se/html/temp/products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (myRes) {
        res = myRes;
    })

// 1bc2ce27-c0b7-4a92-bd36-86be16e1b084