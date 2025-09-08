const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
});

// Smooth scrolling for navigation links
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

// Add loading animation to stat numbers
window.addEventListener("load", () => {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));
        let currentValue = 0;
        const increment = numericValue / 50;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent =
                    Math.floor(currentValue) +
                    (finalValue.includes("+") ? "+" : "");
            }
        }, 30);
    });
});
