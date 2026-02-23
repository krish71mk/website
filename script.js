document.addEventListener("DOMContentLoaded", () => {
  // --- Custom Cursor ---
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });

  // Hover effect on buttons and links
  const interactiveElements = document.querySelectorAll(
    "a, button, input, .course-card",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.backgroundColor = "rgba(0, 240, 255, 0.1)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.backgroundColor = "transparent";
    });
  });

  // --- Sticky Navbar & Scroll Spy ---
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll Spy
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("ri-menu-4-line");
      icon.classList.add("ri-close-line");
    } else {
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-4-line");
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn
        .querySelector("i")
        .classList.replace("ri-close-line", "ri-menu-4-line");
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll(".fade-in-up");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Animated Counters ---
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // Lower is faster

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // --- Dynamic Year in Footer ---
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Form Submission (Mock) ---
  const form = document.getElementById("contactForm");
  const feedback = document.querySelector(".form-feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      feedback.textContent = `Access granted for ${email}. Check your inbox soon.`;
      feedback.style.color = "var(--secondary)";
      form.reset();
      setTimeout(() => {
        feedback.textContent = "";
      }, 4000);
    }
  });
});
