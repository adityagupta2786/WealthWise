// ======================================
// WealthWise Login
// ======================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:5000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,
                password

            })

        });

        const result = await response.json();

        if (result.success) {

            // Save user details
            sessionStorage.setItem("userId", result.id);

sessionStorage.setItem("fullname", result.fullname);

sessionStorage.setItem("email", result.email);

sessionStorage.setItem("phone", result.phone);

sessionStorage.setItem("role", result.role);

sessionStorage.setItem("profileCompleted", result.profileCompleted);

if (result.role === "customer") {

    if (result.profileCompleted) {

        window.location.href = "customer.html";

    } else {

        window.location.href = "complete_profile.html";

    }

}
            else if (result.role === "banker") {

                window.location.href = "banker.html";

            }

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});