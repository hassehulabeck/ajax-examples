var xhr = new XMLHttpRequest;
var res;
var list = document.getElementsByTagName("ul");

xhr.onreadystatechange = function () {
    console.log(xhr.readyState);

    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        res = xhr.response;
        render();
    }
}

xhr.open("GET", "https://www.hulabeck.se/html/temp/products.json");
xhr.responseType = "json";
xhr.send();

function render() {
    res.products.forEach(function (product) {
        var li = document.createElement("li");
        for (let property in product) {
            li.innerHTML += property + ": " + product[property] + "<br />";

        }
        list[0].appendChild(li);
    })
}