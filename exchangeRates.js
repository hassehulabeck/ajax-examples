var xhr = new XMLHttpRequest;
var users;
var lista = document.getElementsByTagName("ul");

xhr.onreadystatechange = function () {

    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        users = xhr.response;

        // Loopa igenom responsen, dvs våra users.
        users.forEach(user => {
            let li = document.createElement("li");
            li.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
            `;
            lista[0].appendChild(li);
        });
    }

}

xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=SEK");
xhr.responseType = "json";
xhr.send();