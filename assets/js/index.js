let currenGroupIndex = 0;
const totalGroups = 3;
let plantsAutoTimer;

function showPlants(index){
    const groups = document.querySelectorAll('.plants-group');
    groups.forEach((group, i) => {
        if (i !== index) {
            group.classList.remove('active');
            group.style.opacity = '0';
            group.style.transform = 'translateX(100%)';
        }
    });
    setTimeout(() => {
        const activeGroup = groups[index];
        if (activeGroup) {
            activeGroup.classList.add('active');
            activeGroup.style.opacity = '1';
            activeGroup.style.transform = 'translateX(0)';
        }
    }, 100);
}

function AutoSlide(){
    AutoSlides = setInterval(() => {
        currenGroupIndex++;
        if(currenGroupIndex >= totalGroups){
            currenGroupIndex = 0;
        }
        showPlants(currenGroupIndex)
    }, 6000);

}

showPlants(0);
AutoSlide();

let currentSlideIndex = 0;
const totalSlides = 2;

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

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    })

}

document.addEventListener('DOMContentLoaded', function () {
    showSlide(0);

    const prevBtn = document.querySelector('.slide-btn-prev');
    const nextBtn = document.querySelector('.slide-btn-next');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    const dot = document.querySelectorAll('.dot');
    dot.forEach((dot, index) => {
        dot.addEvenListener('click', () => currentSlide(index + 1));
    });
});

window.addEventListener('scroll', function () {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


function addToCart(productData) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productData.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(productData);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector('.plants-grid-slider').addEventListener('click', function(e){
     if (e.target.closest('.add-to-cart')){
        const button = e.target.closest('.add-to-cart');
        const plantCard = button.closest('.plant-card');
        const productName = plantCard.querySelector('h3').textContent;
        const productPrice = plantCard.querySelector('.price').textContent;
        const productImage = plantCard.querySelector('img').src;

        const productData = {
            name: productName,
            price: parseFloat(productPrice.replace('₱', '').replace(/,/g, '')),
            image: productImage,
            quantity: 1
        };

        addToCart(productData);

        alert('Đã thêm vào giỏ hàng!');
        setTimeout(() => {
            button.style.backgroundColor = '';
        }, 2000);
        
        if (typeof loadCart === 'function') {
            loadCart();
            updateOrderSummary();
        }
    }
});