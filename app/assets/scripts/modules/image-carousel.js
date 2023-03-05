"use strict";

const wrapperSlides         = document.querySelector('.image-carousel__container');
const arrowBtnLeft          = document.querySelector('.arrow-btn--left');
const arrowBtnRight         = document.querySelector('.arrow-btn--right');
const dots                  = document.querySelector('.dots');
const slides                = document.querySelectorAll('.image-carousel .slide');



let index = 0;
let interval = setInterval(run, 55555000);

slides.forEach(function() {
    const dot = document.createElement('span');
    dot.className = 'circle';
    document.querySelector('.dots').appendChild(dot);
});
dots.firstChild.classList.add('active');
const circles = document.querySelectorAll('.image-carousel .dots span');

circles.forEach(function(circle) {
    circle.setAttribute('data-offset', `${-index * 100}`);
    circle.setAttribute('data-index', `${index}`);
    index++;
});

index = 0;

function run() {
    index++;

    changeImage();
}

function changeImage() {
    if(index > slides.length - 1) {
        index = 0;
    } else if(index < 0) {
        index = slides.length - 1;
    }

    let offset = `${-index * 100}%`;

    slides.forEach(function(slide) {
        slide.getAttribute('data-index');
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');

    circles.forEach(function(circle) {
        circle.classList.remove('active');
    });
    circles[index].classList.add('active');

    wrapperSlides.style.transform = `translateX(${offset})`;
}

function changeDot() {
    let offset = this.getAttribute('data-offset');
    let dotIndex = this.getAttribute('data-index');

    circles.forEach(function(circle) {
        circle.classList.remove('active');
    });
    this.classList.add('active');

    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    slides[dotIndex].classList.add('active');

    wrapperSlides.style.transform = `translateX(${offset}%)`;
    resetInterval();
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, 55555000);
} 

function currentIndex() {
    let activeDot = document.querySelector('.image-carousel .dots .circle.active');
    let currentIndex = activeDot.getAttribute('data-index');
    index = currentIndex;
}

arrowBtnLeft.addEventListener('click', function() {
    currentIndex();
    index--;
    changeImage();
    resetInterval();
});

arrowBtnRight.addEventListener('click', function() {
    currentIndex()
    index++;
    changeImage();
    resetInterval();
});

for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', changeDot);
}
