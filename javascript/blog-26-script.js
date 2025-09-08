
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Scroll progress bar
window.addEventListener("scroll", () => {
    const scrollProgress = document.getElementById("scrollProgress");
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + "%";
});

// Header background change on scroll
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
        header.style.background = "rgba(0, 0, 0, 0.8)";
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add floating animation to wildlife items
document.querySelectorAll(".wildlife-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.style.animation = "float 3s ease-in-out infinite";
});

// Add CSS for floating animation
const style = document.createElement("style");
style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-10px) scale(1.02); }
            }
        `;
document.head.appendChild(style);

// Statistics counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ""));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes("+")) {
                    counter.textContent = Math.ceil(current) + "+";
                } else {
                    counter.textContent = Math.ceil(current);
                }
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = counter.textContent.includes("+")
                    ? target + "+"
                    : target;
            }
        };
        updateCounter();
    });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(document.querySelector(".hero"));
