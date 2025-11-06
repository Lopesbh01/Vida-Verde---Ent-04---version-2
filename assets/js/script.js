// Menu Mobile e Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");
  const dropdowns = document.querySelectorAll(".dropdown");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Toggle menu mobile
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      navOverlay.classList.toggle("active");
      document.body.style.overflow = mainNav.classList.contains("active")
        ? "hidden"
        : "";

      // Fechar todos os dropdowns quando o menu mobile é aberto/fechado
      if (!mainNav.classList.contains("active")) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });

    // Fechar menu ao clicar no overlay
    navOverlay.addEventListener("click", function () {
      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";

      // Fechar todos os dropdowns
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    });
  }

  // Dropdown para Desktop (hover) e Mobile (click)
  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

    if (dropdownToggle) {
      // Para mobile - toggle no click
      dropdownToggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();

          // Fechar outros dropdowns abertos
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("active");
            }
          });

          // Toggle dropdown atual
          dropdown.classList.toggle("active");
        }
      });

      // Para desktop - prevenir comportamento padrão apenas no mobile
      dropdownToggle.addEventListener("click", function (e) {
        if (window.innerWidth > 768) {
          // Permitir navegação normal no desktop
          return true;
        }
      });
    }
  });

  // Fechar dropdowns ao clicar fora (apenas mobile)
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      const isClickInsideDropdown = e.target.closest(".dropdown");
      const isClickOnMobileMenuBtn = e.target.closest("#mobileMenuBtn");

      if (!isClickInsideDropdown && !isClickOnMobileMenuBtn) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    }
  });

  // Fechar menu ao clicar em um link (apenas mobile)
  const navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";

        // Fechar dropdowns
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
  });

  // Fechar menu e dropdowns ao redimensionar a janela
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";

      // Fechar dropdowns no resize para desktop
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Smooth scroll para âncoras
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Verificar se é uma âncora interna (não é # ou #!)
      if (href !== "#" && href !== "#!") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Fechar menu mobile se estiver aberto
          if (window.innerWidth <= 768) {
            mainNav.classList.remove("active");
            navOverlay.classList.remove("active");
            document.body.style.overflow = "";
          }

          // Scroll suave
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Adicionar classe active ao link atual na navegação
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const linkPath = link.getAttribute("href");

      // Para a página inicial
      if (currentPath.endsWith("index.html") || currentPath.endsWith("/")) {
        if (
          linkPath === "index.html" ||
          linkPath === "./" ||
          linkPath === "/"
        ) {
          link.classList.add("active");
        }
      }
      // Para outras páginas
      else if (linkPath && currentPath.endsWith(linkPath)) {
        link.classList.add("active");
      }
    });
  }

  // Chamar a função ao carregar a página
  setActiveNavLink();

  // Prevenir envio de formulários (para demonstração)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simular sucesso no envio
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Formulário enviado com sucesso! (Esta é uma demonstração)");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 1500);
    });
  });

  // Adicionar loading state nos botões de ação
  const actionButtons = document.querySelectorAll(
    '.btn[href*="#"]:not([data-no-load])'
  );
  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        return; // Não aplicar loading para âncoras
      }

      const originalContent = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalContent;
        this.disabled = false;
      }, 1000);
    });
  });

  // Adicionar efeito de hover nos cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Animação de entrada para elementos
  function animateOnScroll() {
    const elements = document.querySelectorAll(".card, .section-title");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Inicializar animações
  const animatedElements = document.querySelectorAll(".card, .section-title");
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Observar scroll para animações
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Chamar uma vez ao carregar

  // Console log para debug
  console.log("Vida Verde - Script carregado com sucesso!");
  console.log("Dropdowns encontrados:", dropdowns.length);
  console.log("Menu mobile:", mobileMenuBtn ? "Encontrado" : "Não encontrado");
});
