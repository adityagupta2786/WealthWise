/* ==========================================
   WEALTHWISE COMPLETE PROFILE
========================================== */

// ==========================================
// Load User Data
// ==========================================

document.getElementById("fullname").value =
sessionStorage.getItem("fullname") || "";

document.getElementById("email").value =
sessionStorage.getItem("email") || "";

document.getElementById("phone").value =
sessionStorage.getItem("phone") || "";

// ==========================================
// Form Submit
// ==========================================

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", async function(e){

    e.preventDefault();

    // ==========================
    // Required Field Validation
    // ==========================

    const requiredFields = [

        "age",
        "occupation",
        "income",
        "expenses",
        "savings"

    ];

    for(const id of requiredFields){

        const input = document.getElementById(id);

        if(input.value.trim() === ""){

            alert("Please fill all required fields.");

            input.focus();

            return;

        }

    }

    // ==========================
    // Collect Investments
    // ==========================

    const investments = [];

    document.querySelectorAll(
        ".checkbox-group input:checked"
    ).forEach(box => {

        investments.push(box.value);

    });

    // ==========================
    // Create Profile Object
    // ==========================

    const profile = {

        userId: sessionStorage.getItem("userId"),

        fullname:
        document.getElementById("fullname").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        age:
        document.getElementById("age").value,

        occupation:
        document.getElementById("occupation").value,

        income:
        document.getElementById("income").value,

        expenses:
        document.getElementById("expenses").value,

        savings:
        document.getElementById("savings").value,

        goal:
        document.getElementById("goal").value,

        risk:
        document.querySelector(
            'input[name="risk"]:checked'
        ).value,

        experience:
        document.getElementById("experience").value,

        loan:
        document.getElementById("loan").value,

        investments:
        investments

    };

    console.log(profile);

    // ==========================
    // Send to Flask
    // ==========================

    try{

        const response = await fetch(

            "http://127.0.0.1:5000/complete-profile",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(profile)

            }

        );

        const result = await response.json();

        if(result.success){

            alert("Profile Saved Successfully!");

            window.location.href = "customer.html";

        }

        else{

            alert(result.message);

        }

    }

    catch(error){

        console.error(error);

        alert("Unable to connect to server.");

    }

});