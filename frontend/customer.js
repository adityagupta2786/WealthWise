/* ==========================================
   USER SESSION
========================================== */

const fullname = sessionStorage.getItem("fullname");
const email = sessionStorage.getItem("email");
const phone = sessionStorage.getItem("phone");
const role = sessionStorage.getItem("role");

// Protect Customer Page
if (!role || role !== "customer") {

    alert("Please login as Customer.");

    window.location.href = "login.html";

}

// Welcome Message
const welcomeText = document.getElementById("welcomeText");

if (welcomeText && fullname) {

    welcomeText.innerHTML = `Welcome Back, ${fullname} 👋`;

}

// Profile Section
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");

if (profileName) profileName.innerText = fullname;

if (profileEmail) profileEmail.innerText = email;

if (profilePhone) profilePhone.innerText = phone;

// AI Greeting
const botGreeting = document.getElementById("botGreeting");

if (botGreeting && fullname) {

    botGreeting.innerHTML =
    `👋 Hello ${fullname}! Ask me anything about your finances.`;

}
/* ==========================================
   SIDEBAR NAVIGATION
========================================== */

const menuItems = document.querySelectorAll(".sidebar ul li[data-page]");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        document
            .getElementById(item.dataset.page)
            .classList.add("active-page");

    });

});


/* ==========================================
   CHART.JS
========================================== */

const incomeCtx = document
.getElementById("incomeChart");

if(incomeCtx){

new Chart(incomeCtx,{

type:"bar",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[

{

label:"Income",

data:[50000,52000,48000,60000,55000,65000],

backgroundColor:"#3b82f6"

},

{

label:"Expense",

data:[22000,25000,24000,27000,26000,30000],

backgroundColor:"#f59e0b"

}

]

},

options:{

responsive:true,

plugins:{

legend:{
labels:{
color:"white"
}
}

},

scales:{

x:{
ticks:{
color:"white"
},
grid:{
color:"#334155"
}
},

y:{
ticks:{
color:"white"
},
grid:{
color:"#334155"
}
}

}

}

});

}


const pieCtx =
document.getElementById("pieChart");

if(pieCtx){

new Chart(pieCtx,{

type:"doughnut",

data:{

labels:[
"Food",
"Shopping",
"Travel",
"Bills"
],

datasets:[{

data:[30,25,20,25],

backgroundColor:[

"#3b82f6",

"#22c55e",

"#f59e0b",

"#ef4444"

]

}]

},

options:{

plugins:{

legend:{

labels:{

color:"white"

}

}

}

}

});

}


/* ==========================================
   AI CHATBOT
========================================== */

const sendBtn =
document.getElementById("sendBtn");

const input =
document.getElementById("userInput");

const messages =
document.getElementById("messages");

const replies = {

"save":
"Try following the 50-30-20 budgeting rule and increase your monthly SIP by ₹2,000.",

"loan":
"Based on your financial health, your loan eligibility looks excellent.",

"investment":
"Consider diversifying with SIPs, fixed deposits, and an emergency fund.",

"expense":
"Your food and shopping expenses are slightly higher than last month.",

"default":
"I'm still learning. Try asking about savings, loans, investments, or expenses."

};

function addMessage(text,cls){

const div=document.createElement("div");

div.className=cls;

div.innerText=text;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

function getReply(question){

const q=question.toLowerCase();

if(q.includes("save"))
return replies.save;

if(q.includes("loan"))
return replies.loan;

if(q.includes("invest"))
return replies.investment;

if(q.includes("expense"))
return replies.expense;

return replies.default;

}

function sendMessage(){

const text=input.value.trim();

if(text==="") return;

addMessage(text,"user");

input.value="";

setTimeout(()=>{

addMessage(getReply(text),"bot");

},700);

}

if(sendBtn){

sendBtn.addEventListener("click",sendMessage);

}

if(input){

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

}


/* ==========================================
   ANIMATED COUNTERS
========================================== */



/* ==========================================
   PROGRESS BAR ANIMATION
========================================== */

const fills =
document.querySelectorAll(".fill");

window.addEventListener("load",()=>{

fills.forEach(fill=>{

const width=fill.style.width;

fill.style.width="0";

setTimeout(()=>{

fill.style.transition="1.5s";

fill.style.width=width;

},300);

});

});


/* ==========================================
   NOTIFICATION
========================================== */

const bell =
document.querySelector(".fa-bell");

if(bell){

bell.addEventListener("click",()=>{

alert(

"🔔 Notifications\n\n• Salary credited\n• Financial score improved\n• Goal progress updated"

);

});

}


/* ==========================================
   SETTINGS
========================================== */

const toggles =
document.querySelectorAll(".setting input");

toggles.forEach(toggle=>{

toggle.addEventListener("change",()=>{

console.log("Setting Changed");

});

});


/* ==========================================
   PAGE FADE ANIMATION
========================================== */

pages.forEach(page=>{

page.style.animation="fade .4s";

});
/* ==========================================
   LOAD CUSTOMER PROFILE
========================================== */

async function loadProfile(){

    const userId = sessionStorage.getItem("userId");

    if(!userId){
        return;
    }

    try{

        const response = await fetch(
            `http://127.0.0.1:5000/profile/${userId}`
        );

        const result = await response.json();

        if(result.success){

            const profile = result.profile;
            const initials = profile.fullname
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase();

document.getElementById("profileAvatar").innerText = initials;
            console.log(profile);
            console.log(
    profile.monthly_income,
    profile.monthly_expenses,
    profile.current_balance
);

            // Welcome Message
            document.querySelector(".topbar h2").innerHTML =
                `Welcome Back, ${profile.fullname} 👋`;

            // Profile Section
            document.getElementById("profileName").innerText =
                profile.fullname;

            document.getElementById("profileEmail").innerText =
                profile.email;

            document.getElementById("profilePhone").innerText =
                profile.phone;

            document.getElementById("profileOccupation").innerText =
                profile.occupation;

            document.getElementById("profileIncome").innerText =
                Number(profile.monthly_income).toLocaleString();

            document.getElementById("profileExpenses").innerText =
                Number(profile.monthly_expenses).toLocaleString();

            document.getElementById("profileSavings").innerText =
                Number(profile.current_balance).toLocaleString();

            document.getElementById("profileGoal").innerText =
                profile.financial_goal;

            document.getElementById("profileRisk").innerText =
                profile.risk_appetite;

    // ==========================
// Dashboard Cards
// ==========================

document.getElementById("dashboardIncome").innerText =
    "₹" + Number(profile.monthly_income).toLocaleString();
    console.log(
    document.getElementById("dashboardIncome").innerHTML
);

document.getElementById("dashboardExpenses").innerText =
    "₹" + Number(profile.monthly_expenses).toLocaleString();

document.getElementById("dashboardBalance").innerText =
    "₹" + Number(profile.current_balance).toLocaleString();
document.getElementById("dashboardSavings").innerText =
    "₹" + Number(profile.current_balance).toLocaleString();

document.getElementById("salaryTransaction").innerText =
    "+₹" + Number(profile.monthly_income).toLocaleString();
}
}


    catch(error){

        console.error("Profile Loading Error:", error);

    }
}

loadProfile();

