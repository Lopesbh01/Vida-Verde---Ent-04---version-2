// Menu Mobile
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector(".nav");
const navOverlay = document.querySelector(".nav-overlay");

function toggleMobileMenu() {
  nav.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
navOverlay.addEventListener("click", toggleMobileMenu);

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Validação de Formulário
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault();
        showToast(
          "Por favor, preencha todos os campos obrigatórios corretamente.",
          "error"
        );
      }
    });
  });
});

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    field.classList.remove("error");

    if (!field.value.trim()) {
      field.classList.add("error");
      isValid = false;
    }

    if (field.type === "email" && !isValidEmail(field.value)) {
      field.classList.add("error");
      isValid = false;
    }
  });

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sistema de Toast
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${
              type === "success" ? "check" : "exclamation"
            }-circle"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Smooth Scroll para âncoras
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

// Intersection Observer para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".card, .section-title");
  animateElements.forEach((el) => observer.observe(el));
});
