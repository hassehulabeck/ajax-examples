var xhr = new XMLHttpRequest;
var res;

xhr.onreadystatechange = function () {
    console.log(xhr.readyState);

    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        res = xhr.response;
    }
    console.log(res);
}

xhr.open("GET", "https://www.hulabeck.se/html/temp/products.json");
xhr.responseType = "json";
xhr.send();