let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("registrationForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let mobile = document.getElementById("mobile").value;

    // Create user object
    let user = {
        name: name,
        email: email,
        password: password,
        mobile: mobile
    };

    // Push into array
    users.push(user);

    // Store in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // AJAX POST Request
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 201) {

            alert("Registration Successful!");

            document.getElementById("registrationForm").reset();
        }
    };

    xhr.send(JSON.stringify(user));
});