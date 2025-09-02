// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const floatingButterfly = document.querySelector('.floating-butterfly');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Butterfly Movement on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (floatingButterfly) {
        floatingButterfly.style.transform = `translateY(${rate}px)`;
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-overlay');

    if (heroOverlay) {
        heroOverlay.style.transform = `translateX(${scrolled * 0.2}px)`;
    }
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .feature-item, .adventure-section, .explore-section');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});

// Hero Button Interactions
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-book, .btn-cta').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Read More Functionality
const readMoreBtn = document.querySelector('.read-more');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        const description = document.querySelector('.hero-description');
        const fullText = `Wildlife traditionally refers to undomesticated animal species, 
            but has come to include all organisms that grow or live wild in 
            an area without being introduced by humans. Wildlife can be found 
            in all ecosystems including deserts, forests, rainforests, plains, 
            grasslands, and various water bodies. This includes mammals, birds, 
            reptiles, amphibians, fish, and invertebrates.`;

        if (description.classList.contains('expanded')) {
            description.innerHTML = `Wildlife traditionally refers to undomesticated animal species, 
                but has come to include all organisms that grow or live wild in 
                an area without being introduced by... 
                <span class="read-more">Read more</span>`;
            description.classList.remove('expanded');
        } else {
            description.innerHTML = `${fullText} <span class="read-more">Read less</span>`;
            description.classList.add('expanded');
        }

        // Re-attach event listener
        const newReadMoreBtn = description.querySelector('.read-more');
        if (newReadMoreBtn) {
            newReadMoreBtn.addEventListener('click', arguments.callee);
        }
    });
}

// Dynamic Star Rating Animation
const stars = document.querySelector('.stars');
if (stars) {
    stars.addEventListener('mouseenter', () => {
        stars.style.transform = 'scale(1.1)';
        stars.style.filter = 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.5))';
    });

    stars.addEventListener('mouseleave', () => {
        stars.style.transform = 'scale(1)';
        stars.style.filter = 'none';
    });
}

// Feature Card Hover Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-image');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.filter = 'drop-shadow(0 5px 15px rgba(255, 215, 0, 0.3))';
        }
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-image');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = 'none';
        }
    });
});

// Animal Display Interaction
const animalDisplay = document.querySelector('.animal-display');
if (animalDisplay) {
    animalDisplay.addEventListener('click', () => {
        animalDisplay.style.animation = 'none';
        setTimeout(() => {
            animalDisplay.style.animation = 'float 3s ease-in-out infinite';
        }, 100);

        // Change animal randomly
        const animals = ['🦁', '🐅', '🐘', '🦏', '🦒', '🦓', '🐆'];
        const currentAnimal = animalDisplay.textContent;
        let newAnimal;
        do {
            newAnimal = animals[Math.floor(Math.random() * animals.length)];
        } while (newAnimal === currentAnimal);

        animalDisplay.style.transform = 'scale(0)';
        setTimeout(() => {
            animalDisplay.textContent = newAnimal;
            animalDisplay.style.transform = 'scale(1)';
        }, 200);
    });
}

// Social Links Hover Effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2) rotate(360deg)';
        link.style.background = 'rgba(255, 107, 107, 0.3)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1) rotate(0deg)';
        link.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Price Counter Animation
function animatePrice() {
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        const targetPrice = 459;
        const duration = 2000;
        const startPrice = 0;
        const startTime = performance.now();

        function updatePrice(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPrice = Math.floor(startPrice + (targetPrice - startPrice) * progress);

            priceElement.innerHTML = `${currentPrice} <span class="currency">USD</span>`;

            if (progress < 1) {
                requestAnimationFrame(updatePrice);
            }
        }

        requestAnimationFrame(updatePrice);
    }
}

// Trigger price animation when visible
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePrice();
            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const priceElement = document.querySelector('.price');
if (priceElement) {
    priceObserver.observe(priceElement);
}

// Cursor Trail Effect
let mouseTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });

    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }

    // Remove existing trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

    // Create new trail elements
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${6 - index * 0.5}px;
            height: ${6 - index * 0.5}px;
            background: rgba(255, 107, 107, ${0.8 - index * 0.08});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trail);

        // Remove trail element after animation
        setTimeout(() => {
            if (document.body.contains(trail)) {
                document.body.removeChild(trail);
            }
        }, 500);
    });
});

// Book Now Button Functionality
document.querySelectorAll('.btn-book, .btn-cta').forEach(button => {
    button.addEventListener('click', () => {
        // Create booking modal
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: #1a1f2e;
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            border: 1px solid rgba(255, 107, 107, 0.3);
        `;

        modalContent.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #ccc;
            ">&times;</button>
            <h2 style="color: #fff; margin-bottom: 1rem;">🦌 Book Your Adventure</h2>
            <p style="color: #ccc; margin-bottom: 2rem;">Ready to explore the wild? Contact us to start your wildlife journey!</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn-contact" style="
                    background: #ff6b6b;
                    color: #fff;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Contact Us</button>
                <button class="btn-info" style="
                    background: transparent;
                    color: #fff;
                    padding: 12px 24px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">More Info</button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        };

        modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Button actions
        modalContent.querySelector('.btn-contact').addEventListener('click', () => {
            alert('📞 Contact us at: info@discoverwild.com or call +1-800-WILDLIFE');
            closeModal();
        });

        modalContent.querySelector('.btn-info').addEventListener('click', () => {
            alert('🌿 Our tours include:\n• Expert guides\n• All equipment\n• Transportation\n• Eco-friendly practices\n• Safety insurance');
            closeModal();
        });
    });
});

// Add CSS for modal animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .expanded {
        max-height: none !important;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
    🦌 DiscoverWild - Wildlife Adventure Platform 🦌
    Welcome to the ultimate wildlife experience!
    Explore the wild like never before.
    🦁🐅🐘🦏🦒
`);

// Page Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);

    // Add loading complete class for animations
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(30px);
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease 0.5s, transform 1s ease 0.5s;
    }
`;
document.head.appendChild(loadingStyle);

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});