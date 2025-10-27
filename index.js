
function blink() {
    const btn = $(this);
    btn.addClass("clicked");setTimeout(() => {
        btn.removeClass("clicked");
    }, 50);
}

$(document).ready(function () {
    $(".headbutton, .contact, .github-btn, a").on("click", blink);});



let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dotsWrapper = document.querySelector(".dots");
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => showSlide(i));
    dotsWrapper.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function showSlide(index) 
{
    slides.forEach((s, i) => 
        {
        s.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
}

document.querySelector(".next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);});

document.querySelector(".prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);});
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 6000);


const header = document.querySelector("header");
const menuBtn = document.querySelector(".menubut");
const menuList = document.querySelector(".headbutt-list");

function updateHeaderOnScroll() {
    const y = window.scrollY;
    const trigger = 400;

    if (header.classList.contains("menu-open")) return;
    if (y >= trigger) {
        header.style.backgroundColor = "rgba(20,20,20,1)";
        document.querySelectorAll(".slide img").forEach(img => {
            img.style.filter = "brightness(0.4)";
        });
    } else {
        const fadeEnd = trigger * 0.5;
        let progress = Math.min(Math.max(y / fadeEnd, 0), 1);
        header.style.backgroundColor = `rgba(20,20,20,${progress})`;

        document.querySelectorAll(".slide img").forEach(img => {
            img.style.filter = `brightness(${1 - progress * 0.5})`;
        });
    }
}

window.addEventListener("scroll", updateHeaderOnScroll);

menuBtn.addEventListener("click", () => {
    header.classList.toggle("menu-open");
    menuList.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (header.classList.contains("menu-open")) {
        header.style.backgroundColor = "rgba(20,20,20,1)";
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        updateHeaderOnScroll();
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

document.querySelectorAll(".headbutt-list a").forEach(link => {
    link.addEventListener("click", () => {
        if (header.classList.contains("menu-open")) {
            header.classList.remove("menu-open");
         menuList.classList.remove("active");
        updateHeaderOnScroll();
            menuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const observeTargets = [".github-content",".aboutme",".titlofskill > h1",".certificationshead > h1",".resumepart",".part-1",".part-2",".verticalline"];
const observer = new IntersectionObserver(entries => 
        {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                   
                observer.unobserve(entry.target);
      }
        });
    }, { threshold: 0.5 });

           observeTargets.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) observer.observe(el);
    });

    updateHeaderOnScroll();
});

