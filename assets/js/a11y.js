// Sistema Completo de Acessibilidade WCAG 2.1 AA
class A11yManager {
  constructor() {
    this.currentTheme = localStorage.getItem("preferred-theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.addSkipLinks();
    this.enhanceKeyboardNavigation();
    this.setupFocusManagement();
    this.addScreenReaderSupport();
    this.setupThemeSwitcher();
  }

  addSkipLinks() {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Ir para o conteúdo principal";
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupThemeSwitcher() {
    const themeSwitcher = document.createElement("div");
    themeSwitcher.className = "theme-switcher";
    themeSwitcher.innerHTML = `
      <button class="btn btn-sm" data-theme="light" aria-label="Modo claro">
        <i class="fas fa-sun"></i>
      </button>
      <button class="btn btn-sm" data-theme="dark" aria-label="Modo escuro">
        <i class="fas fa-moon"></i>
      </button>
      <button class="btn btn-sm" data-theme="high-contrast" aria-label="Modo alto contraste">
        <i class="fas fa-adjust"></i>
      </button>
    `;

    const header = document.querySelector(".header-content");
    header.appendChild(themeSwitcher);

    themeSwitcher.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme");
        this.switchTheme(theme);
      });
    });
  }

  switchTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("preferred-theme", theme);
  }

  enhanceKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllDropdowns();
      if (e.key === "Tab") document.body.classList.add("keyboard-navigation");
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation");
    });
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  new A11yManager();
});
