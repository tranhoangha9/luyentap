let currentSlideIndex = 0;
const totalSlides = 2;

function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
    updateDots();
}

function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }
    
    showSlide(currentSlideIndex);
    updateDots();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    updateDots();
}

function showSlide(index) {
    const cards = document.querySelectorAll('.testimonials-content');
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.opacity = '1';
            card.style.zIndex = '2';
        } else {
            card.style.opacity = '0';
            card.style.zIndex = '1';
        }
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
});


function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
});