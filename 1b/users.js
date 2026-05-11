let users = JSON.parse(localStorage.getItem("users")) || [];

let tableBody = document.getElementById("userTableBody");

users.forEach(function (user) {

    let row = `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.mobile}</td>
        </tr>
    `;

    tableBody.innerHTML += row;
});