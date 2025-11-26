// ========== MENU TOGGLE ==========
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking on link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.padding = "1rem 5%";
    header.style.boxShadow = "0 2px 30px rgba(0,0,0,0.1)";
  } else {
    header.style.padding = "1.5rem 5%";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
  }
});

// ========== FORM SUBMISSION ==========
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Obrigado pelo contato! Retornaremos em breve.");
  e.target.reset();
});

// ========== STATS COUNTER ==========
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counters = document.querySelectorAll(".stat-number");

      counters.forEach((counter) => {
        const target = +counter.dataset.target;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function update() {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        }
        update();
      });

      statsObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelector(".stats") &&
  statsObserver.observe(document.querySelector(".stats"));

// ========== TESTIMONIALS SLIDER (MOBILE) ==========
const sliderTrack = document.getElementById("sliderTrack");
const sliderDots = document.querySelectorAll(".slider-dot");

if (sliderTrack && sliderDots.length > 0) {
  let currentSlide = 0;
  let startX = 0;
  let isDragging = false;

  function updateSlider() {
    const slideWidth = sliderTrack.children[0].offsetWidth;
    const gap = 32;

    sliderTrack.scrollTo({
      left: (slideWidth + gap) * currentSlide,
      behavior: "smooth",
    });

    sliderDots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentSlide)
    );
  }

  sliderDots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      currentSlide = i;
      updateSlider();
    })
  );

  sliderTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  sliderTrack.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < sliderDots.length - 1) currentSlide++;
      else if (diff < 0 && currentSlide > 0) currentSlide--;
      updateSlider();
    }
  });

  sliderTrack.addEventListener("scroll", () => {
    const slideWidth = sliderTrack.children[0].offsetWidth;
    const gap = 32;
    const scrollLeft = sliderTrack.scrollLeft;

    const newSlide = Math.round(scrollLeft / (slideWidth + gap));

    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      sliderDots.forEach((dot, i) =>
        dot.classList.toggle("active", i === currentSlide)
      );
    }
  });
}

// ========== INTERSECTION ANIMATIONS ==========
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateY(0)";
  });
}, observerOptions);

document
  .querySelectorAll(".project-card, .service-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    revealObserver.observe(el);
  });
