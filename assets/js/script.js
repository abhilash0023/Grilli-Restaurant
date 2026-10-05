'use strict';

// Preload
const preload = document.querySelector("[data-preaload]");

window.addEventListener("load", () => {

    if (preload) {
        preload.classList.add("loaded");
    }

    document.body.classList.add("loaded");

});

// add event listener on multiple elements 
const addEventOnElements = function (elements, eventType, callback){
    for(let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

// navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// header and back to top
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollpos = 0;

const hideHeader = function(){
    const isScrollBottom = lastScrollpos < window.scrollY;

    if(isScrollBottom){
        header.classList.add("hide");
    }else{
        header.classList.remove("hide");
    }

    lastScrollpos = window.scrollY;
}

window.addEventListener("scroll", function(){

    if(window.scrollY >= 50){
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    }else{
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }

})

// heroSlider

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updataSliderPos = function(){
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSliderPos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSliderPos];
}

const slideNext = function(){
    if(currentSliderPos >= heroSliderItems.length - 1){
        currentSliderPos = 0;
    }else{
        currentSliderPos++;
    }

    updataSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function(){
    if(currentSliderPos <= 0){
        currentSliderPos = heroSliderItems.length - 1;
    }else{
        currentSliderPos--;
    }

    updataSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

//  auto slider

let autoSlideInterval;

const autoSlide = function() {

    clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(function(){
        slideNext();
    }, 7000);

}

addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseover",
    function(){
        clearInterval(autoSlideInterval);
    }
);

addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseout",
    autoSlide
);

window.addEventListener("load", autoSlide);

// parallax effect 

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener('mousemove', function(event){

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the no eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {

        const parallaxSpeed =
            Number(parallaxItems[i].dataset.parallaxSpeed);

        const moveX = x * parallaxSpeed;
        const moveY = y * parallaxSpeed;

        parallaxItems[i].style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0px)`;

    }

});