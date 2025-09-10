
document
    .getElementById("volunteerForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {};

        // Get regular form fields
        for (let [key, value] of formData.entries()) {
            if (key !== "projects") {
                data[key] = value;
            }
        }

        // Get selected projects
        const selectedProjects = [];
        const projectCheckboxes = document.querySelectorAll(
            'input[name="projects"]:checked'
        );
        projectCheckboxes.forEach((checkbox) => {
            const card = checkbox.closest(".project-card");
            const projectName = card.querySelector("h3").textContent.trim();
            selectedProjects.push(projectName);
        });

        // Create result table
        const tbody = document.querySelector("#resultTable tbody");
        tbody.innerHTML = "";

        // Define field labels in Thai
        const fieldLabels = {
            fullName: "ชื่อ-นามสกุล",
            email: "อีเมล",
            phone: "เบอร์โทรศัพท์",
            age: "อายุ",
            gender: "เพศ",
            education: "ระดับการศึกษา",
            occupation: "อาชีพ",
            province: "จังหวัดที่อยู่",
            experience: "ประสบการณ์งานอาสา",
            motivation: "เหตุผลที่ต้องการเข้าร่วม",
            terms: "ยอมรับเงื่อนไข",
            newsletter: "รับข่าวสาร",
        };

        // Add selected projects to table
        if (selectedProjects.length > 0) {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = "โครงการที่เลือก";
            row.insertCell(1).textContent = selectedProjects.join(", ");
        }

        // Add other form data to table
        Object.entries(data).forEach(([key, value]) => {
            if (fieldLabels[key]) {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = fieldLabels[key];

                let displayValue = value;
                if (key === "terms" || key === "newsletter") {
                    displayValue = value ? "ใช่" : "ไม่";
                } else if (key === "motivation" && !value) {
                    displayValue = "-";
                } else if (key === "age") {
                    displayValue = value + " ปี";
                }

                row.insertCell(1).textContent = displayValue;
            }
        });

        // Show result section and scroll to it
        document.getElementById("resultSection").style.display = "block";
        document.getElementById("resultSection").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        // Reset form
        this.reset();
        projectCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    });

// Add click effect for project cards
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function (e) {
        if (e.target.type !== "checkbox") {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll(".project-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
})