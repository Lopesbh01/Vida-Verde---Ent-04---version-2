// Menu Mobile
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle menu mobile
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      navOverlay.classList.toggle("active");
      document.body.style.overflow = mainNav.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Fechar menu ao clicar no overlay
    navOverlay.addEventListener("click", function () {
      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Dropdown para mobile
  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

    if (dropdownToggle) {
      dropdownToggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    }
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Fechar menu ao redimensionar a janela
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
