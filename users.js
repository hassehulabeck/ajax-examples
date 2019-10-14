var xhr = new XMLHttpRequest;
var users;
var tbody = document.getElementsByTagName("tbody");

xhr.onreadystatechange = function () {

    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        users = xhr.response;

        // Loopa igenom responsen, dvs våra users.
        users.forEach(user => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
            `;
            tbody[0].appendChild(tr);
        });
    }

}

xhr.open("GET", "http://jsonplaceholder.typicode.com/users");
xhr.responseType = "json";
xhr.send();