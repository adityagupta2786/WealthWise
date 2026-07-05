// =======================================
// Smooth Scrolling for Navigation Links
// =======================================

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: "smooth"
        });

    });
});


// =======================================
// Navbar Background on Scroll
// =======================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background = "#020617";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";

    }

    else{

        navbar.style.background = "#0f172a";
        navbar.style.boxShadow = "none";

    }

});


// =======================================
// Animate Hero Progress Bar
// =======================================

const progressBar = document.querySelector(".progress-fill");

window.addEventListener("load", () => {

    progressBar.style.width = "0%";

    setTimeout(() => {

        progressBar.style.transition = "width 2s ease";
        progressBar.style.width = "82%";

    }, 500);

});


// =======================================
// Counter Animation
// =======================================

const score = document.querySelector(".score");

let current = 0;
let target = 82;

const counter = setInterval(() => {

    if(current >= target){

        clearInterval(counter);

    }

    else{

        current++;

        score.innerHTML = `${current}<span>/100</span>`;

    }

},25);


// =======================================
// Scroll Reveal Animation
// =======================================

const revealElements = document.querySelectorAll(

    ".card, .step, .about-card"

);

function reveal(){

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const boxTop = element.getBoundingClientRect().top;

        if(boxTop < triggerBottom){

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


// =======================================
// Active Navigation Link
// =======================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(pageYOffset >= sectionTop){

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){

            link.classList.add("active");

        }

    });

});


// =======================================
// Hero Card Floating Animation
// =======================================

const heroCard = document.querySelector(".hero-card");

let position = 0;
let direction = 1;

setInterval(() => {

    position += direction;

    heroCard.style.transform = `translateY(${position}px)`;

    if(position >= 10)
        direction = -1;

    if(position <= 0)
        direction = 1;

},60);


// =======================================
// Feature Card Hover Glow
// =======================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow =
        "0 0 25px rgba(59,130,246,0.5)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "none";

    });

});
/* ===================================
   MOBILE MENU
=================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinksMenu = document.querySelector(".nav-links");
const navButtons = document.querySelector(".nav-buttons");

menuToggle.addEventListener("click", () => {

    navLinksMenu.classList.toggle("active");
    navButtons.classList.toggle("active");

});