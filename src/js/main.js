// -------------------------
// DOM REFERENCES
// -------------------------

const navbar = document.querySelector("#navbar");
const navLinks =
    document.querySelectorAll(".nav-links .nav-link");

const smoothLinks =
    document.querySelectorAll(".smooth-link");

const sections =
    document.querySelectorAll("main section");


// -------------------------
// SMOOTH SCROLLING
// -------------------------

smoothLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const href =
            link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        event.preventDefault();

        const target =
            document.querySelector(href);

        if (!target) {
            return;
        }

        const navbarHeight =
            navbar.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top
            + window.scrollY
            - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


// -------------------------
// NAVBAR RESIZING
// -------------------------

function updateNavbarSize() {

    if (window.scrollY > 50) {
        navbar.classList.add("compact");
    } else {
        navbar.classList.remove("compact");
    }

}


// -------------------------
// POSITION INDICATOR
// -------------------------

function updateActiveNavigation() {

    const navbarBottom =
        navbar.getBoundingClientRect().bottom;

    let currentSection =
        sections[0].id;

    sections.forEach((section) => {

        const rect =
            section.getBoundingClientRect();

        if (rect.top <= navbarBottom + 8) {
            currentSection =
                section.id;
        }

    });


    // Requirement:
    // final item must be active at page bottom

    const atBottom =
        window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 3;

    if (atBottom) {

        currentSection =
            sections[sections.length - 1].id;

    }


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", () => {

    updateNavbarSize();

    updateActiveNavigation();

});

updateNavbarSize();
updateActiveNavigation();


// -------------------------
// CAROUSEL
// -------------------------

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");

const previousButton =
    document.querySelector("#previous-slide");

const nextButton =
    document.querySelector("#next-slide");


let currentSlide = 0;


function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

}


nextButton.addEventListener("click", () => {

    currentSlide =
        (currentSlide + 1) % slides.length;

    showSlide(currentSlide);

});


previousButton.addEventListener("click", () => {

    currentSlide =
        (
            currentSlide
            - 1
            + slides.length
        ) % slides.length;

    showSlide(currentSlide);

});


dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        currentSlide =
            Number(dot.dataset.slide);

        showSlide(currentSlide);

    });

});


// -------------------------
// MODAL
// -------------------------

const modal =
    document.querySelector("#about-modal");

const openModalButton =
    document.querySelector("#open-modal");

const closeModalButton =
    document.querySelector("#close-modal");


function openModal() {

    modal.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow =
        "";

}


openModalButton.addEventListener(
    "click",
    openModal
);


closeModalButton.addEventListener(
    "click",
    closeModal
);


// close by clicking outside the box

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


// close using Escape

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
            &&
            modal.classList.contains("open")
        ) {
            closeModal();
        }

    }
);