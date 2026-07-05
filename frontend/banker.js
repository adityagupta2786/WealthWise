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
   CUSTOMER GROWTH CHART
========================================== */

const customerChart =
document.getElementById("customerChart");

if(customerChart){

new Chart(customerChart,{

type:"line",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"
],

datasets:[{

label:"Customers",

data:[820,900,960,1050,1130,1250],

borderColor:"#3b82f6",

backgroundColor:"rgba(59,130,246,.2)",

fill:true,

tension:.4

}]

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
ticks:{color:"white"},
grid:{color:"#334155"}
},

y:{
ticks:{color:"white"},
grid:{color:"#334155"}
}

}

}

});

}


/* ==========================================
   RISK CHART
========================================== */

const riskChart =
document.getElementById("riskChart");

if(riskChart){

new Chart(riskChart,{

type:"doughnut",

data:{

labels:[
"Low",
"Medium",
"High"
],

datasets:[{

data:[72,20,8],

backgroundColor:[

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
   NOTIFICATION
========================================== */

const bell =
document.querySelector(".fa-bell");

if(bell){

bell.addEventListener("click",()=>{

alert(

`Notifications

• 3 New Customers Joined

• 2 Customers Need Follow-up

• Monthly Report Ready

• AI found 5 Upsell Opportunities`

);

});

}


/* ==========================================
   ANIMATED KPI COUNTERS
========================================== */

const cards =
document.querySelectorAll(".stat-card h2");

cards.forEach(card=>{

const text = card.innerText;

let number = parseFloat(text.replace(/[^\d.]/g,""));

if(isNaN(number)) return;

let count=0;

const increment=number/60;

const interval=setInterval(()=>{

count+=increment;

if(count>=number){

count=number;
clearInterval(interval);

}

if(text.includes("Cr")){

card.innerText="₹"+count.toFixed(1)+" Cr";

}

else if(text.includes("%")){

card.innerText=Math.floor(count)+"%";

}

else{

card.innerText=Math.floor(count).toLocaleString();

}

},25);

});


/* ==========================================
   REPORT BUTTONS
========================================== */

const buttons =
document.querySelectorAll(".info-card button");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Report download will be available after backend integration.");

});

});


/* ==========================================
   ROW HIGHLIGHT
========================================== */

const rows =
document.querySelectorAll("table tr");

rows.forEach((row,index)=>{

if(index===0) return;

row.addEventListener("click",()=>{

rows.forEach(r=>r.style.background="");

row.style.background="#334155";

});

});


/* ==========================================
   CARD HOVER GLOW
========================================== */

const infoCards =
document.querySelectorAll(".info-card,.stat-card");

infoCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.boxShadow=
"0 0 25px rgba(59,130,246,.35)";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="";

});

});


/* ==========================================
   PAGE FADE
========================================== */

pages.forEach(page=>{

page.style.animation="fade .5s";

});