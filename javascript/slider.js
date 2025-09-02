// Slider State Management
let slideIndex = 1;
const totalSlides = 3;
let autoSlideInterval;

// Initialize slider
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('totalSlides').textContent = totalSlides;
    startAutoSlide();
});

// Core Slider Functions
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('slider-dot');

    if (n > totalSlides) { slideIndex = 1; }
    if (n < 1) { slideIndex = totalSlides; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    // Show current slide and activate corresponding dot
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    // Update counter
    document.getElementById('currentSlide').textContent = slideIndex;
}

// Navigation Functions
function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    resetAutoSlide();
}

function previousSlide() {
    slideIndex--;
    showSlide(slideIndex);
    resetAutoSlide();
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    resetAutoSlide();
}

// Auto-slide Functions
function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.hero-slider');

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});

// Touch/Swipe Support (Optional)
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (startX - endX > 50) {
        // Swipe left - next slide
        nextSlide();
    } else if (endX - startX > 50) {
        // Swipe right - previous slide  
        previousSlide();
    }
}