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
        if (i !== index) {
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.transform = 'translateX(100%)';
        }
    });
    
    setTimeout(() => {
        const activeCard = cards[index];
        if (activeCard) {
            activeCard.style.opacity = '1';
            activeCard.style.zIndex = '10';
            activeCard.style.transform = 'translateX(0)';
        }
    }, 100);
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    
    const prevBtn = document.querySelector('.slide-btn-prev');
    const nextBtn = document.querySelector('.slide-btn-next');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1));
    });
});

window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});