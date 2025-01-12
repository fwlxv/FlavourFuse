document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: "smooth"
                });
            } else {
                console.warn(`Section with id "${targetId}" not found.`);
            }
        });
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Por favor preencha todos os campos antes de submeter.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Por favor insira um endereço de email válido.");
            return;
        }

        alert("Obrigado! Retornaremos você em breve.");
        contactForm.reset();
    });

    // Lazy Load for Service Cards
    const serviceCards = document.querySelectorAll(".service-cards .card img");

    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    serviceCards.forEach(card => {
        const imgSrc = card.getAttribute("src");
        card.setAttribute("data-src", imgSrc);
        card.removeAttribute("src");
        lazyLoad(card);
    });
});
