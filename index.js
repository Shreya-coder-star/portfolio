/* ===================================================
   NAVBAR
=================================================== */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* ===================================================
   HERO — ROTATING ROLE TEXT
=================================================== */
const rotatingText = document.getElementById("rotatingText");
const roles = ["web apps", "Android apps", "AI-powered tools", "clean UIs"];
let roleIndex = 0;

if (rotatingText) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    rotatingText.style.opacity = "0";
    setTimeout(() => {
      rotatingText.textContent = roles[roleIndex];
      rotatingText.style.opacity = "1";
    }, 300);
  }, 2200);
}

/* ===================================================
   SPOTLIGHT GLOW ON CARDS (follows cursor)
=================================================== */
document.querySelectorAll("[data-spotlight]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

/* ===================================================
   ANIMATED COUNTERS
=================================================== */
function animateCounter(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

/* ===================================================
   SCROLL REVEAL + trigger counters when visible
=================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        const counters = entry.target.querySelectorAll(".stat-num");
        counters.forEach((c) => {
          if (!c.dataset.done) {
            c.dataset.done = "true";
            animateCounter(c);
          }
        });

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));