// ======================================
// Toast Notification
// ======================================

function showToast(message, type) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    toast.className = "toast";
    toast.classList.add(type);

    if (type === "success") {
        toastIcon.className = "fa-solid fa-circle-check";
    } else if (type === "error") {
        toastIcon.className = "fa-solid fa-circle-xmark";
    } else {
        toastIcon.className = "fa-solid fa-triangle-exclamation";
    }

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ======================================
// Signup Validation
// ======================================

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Empty Fields
    if (
        fullname === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        showToast("Please fill all the fields.", "warning");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showToast("Please enter a valid email address.", "warning");
        return;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
        showToast("Phone number must contain exactly 10 digits.", "warning");
        return;
    }

    // Password Length
    if (password.length < 8) {
        showToast("Password must be at least 8 characters long.", "warning");
        return;
    }

    // Password Match
    if (password !== confirmPassword) {
        showToast("Passwords do not match.", "warning");
        return;
    }

    // Terms
    if (!terms) {
        showToast("Please accept the Terms & Conditions.", "warning");
        return;
    }

    // ==========================
    // Send Data to Flask
    // ==========================

    try {

        const response = await fetch("http://127.0.0.1:5000/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullname,
                email,
                phone,
                password
            })

        });

        const result = await response.json();

        if (result.success) {

            const modal = document.getElementById("successModal");

            modal.classList.add("show");

            showToast(result.message, "success");

            setTimeout(() => {

                window.location.href = "login.html";

            }, 3000);

        } else {

            showToast(result.message, "error");

        }

    } catch (error) {

        console.error(error);

        showToast("Unable to connect to server.", "error");

    }

});   //  <-- THIS WAS MISSING

// ======================================
// Login Button
// ======================================

document.getElementById("loginNow").addEventListener("click", () => {

    window.location.href = "login.html";

});

// ======================================
// Show / Hide Password
// ======================================

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {

            input.type = "text";

            button.classList.remove("fa-eye");
            button.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            button.classList.remove("fa-eye-slash");
            button.classList.add("fa-eye");

        }

    });

});