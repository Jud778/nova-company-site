document.addEventListener("DOMContentLoaded", () => {

  /* Mobile navigation */

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }


  /* Reveal animations */

  const revealElements = document.querySelectorAll(".reveal");

  /*
    IMPORTANT:
    Make everything visible immediately first.
    This prevents the page from ever becoming blank
    if IntersectionObserver is unavailable.
  */

  revealElements.forEach(element => {
    element.classList.add("visible");
  });


  /* Add the observer only as an enhancement */

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  }


  /* Cursor glow */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow) {

    window.addEventListener("pointermove", event => {

      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;

    });

  }


  /* Orb movement */

  const orb = document.querySelector(".orb");

  if (orb) {

    window.addEventListener("pointermove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 14;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 14;

      orb.style.marginLeft = `${x}px`;
      orb.style.marginTop = `${y}px`;

    });

  }


  /* Navbar */

  const navbar = document.querySelector(".navbar");

  if (navbar) {

    const updateNavbar = () => {

      if (window.scrollY > 40) {

        navbar.style.background = "rgba(5,5,5,.72)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.borderRadius = "0 0 18px 18px";

      } else {

        navbar.style.background = "transparent";
        navbar.style.backdropFilter = "none";
        navbar.style.borderRadius = "0";

      }

    };

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

  }


  /* Product card glow */

  document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
        radial-gradient(
          350px circle at ${x}px ${y}px,
          rgba(124,58,237,.12),
          transparent 55%
        ),
        #0b0b0d
      `;

    });

    card.addEventListener("mouseleave", () => {

      card.style.background = `
        radial-gradient(
          circle at 80% 0%,
          rgba(124,58,237,.08),
          transparent 35%
        ),
        #0b0b0d
      `;

    });

  });


  /* Current year */

  const yearElement =
    document.querySelector(".footer-bottom span");

  if (yearElement) {
    yearElement.textContent =
      `© ${new Date().getFullYear()} NOVA`;
  }

});
