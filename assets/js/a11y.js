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
    this.setupFontSizeControls();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    localStorage.setItem("preferred-theme", theme);

    // Anunciar mudança para leitores de tela
    this.announceToScreenReader(`Modo ${theme} ativado`);
  }

  addSkipLinks() {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Ir para o conteúdo principal";
    skipLink.setAttribute(
      "aria-label",
      "Pular navegação e ir para o conteúdo principal"
    );
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupThemeSwitcher() {
    const themeSwitcher = document.createElement("div");
    themeSwitcher.className = "theme-switcher";
    themeSwitcher.setAttribute(
      "aria-label",
      "Controles de tema e acessibilidade"
    );

    themeSwitcher.innerHTML = `
      <div class="theme-buttons">
        <button class="btn btn-sm btn-outline" data-theme="light" aria-pressed="${
          this.currentTheme === "light"
        }">
          <i class="fas fa-sun" aria-hidden="true"></i>
          <span class="sr-only">Modo claro</span>
        </button>
        <button class="btn btn-sm btn-outline" data-theme="dark" aria-pressed="${
          this.currentTheme === "dark"
        }">
          <i class="fas fa-moon" aria-hidden="true"></i>
          <span class="sr-only">Modo escuro</span>
        </button>
        <button class="btn btn-sm btn-outline" data-theme="high-contrast" aria-pressed="${
          this.currentTheme === "high-contrast"
        }">
          <i class="fas fa-adjust" aria-hidden="true"></i>
          <span class="sr-only">Modo alto contraste</span>
        </button>
      </div>
    `;

    const header = document.querySelector(".header-content");
    if (header) {
      header.appendChild(themeSwitcher);
    }

    themeSwitcher.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const theme = e.currentTarget.getAttribute("data-theme");
        this.applyTheme(theme);

        // Atualizar estado dos botões
        themeSwitcher.querySelectorAll("button").forEach((b) => {
          b.setAttribute("aria-pressed", b === e.currentTarget);
        });
      });
    });
  }

  setupFontSizeControls() {
    const fontSizeControls = document.createElement("div");
    fontSizeControls.className = "font-size-controls";
    fontSizeControls.innerHTML = `
      <button class="btn btn-sm btn-outline" id="font-decrease" aria-label="Diminuir tamanho da fonte">
        A-
      </button>
      <button class="btn btn-sm btn-outline" id="font-reset" aria-label="Tamanho normal da fonte">
        A
      </button>
      <button class="btn btn-sm btn-outline" id="font-increase" aria-label="Aumentar tamanho da fonte">
        A+
      </button>
    `;

    const themeSwitcher = document.querySelector(".theme-switcher");
    if (themeSwitcher) {
      themeSwitcher.appendChild(fontSizeControls);
    }

    // Controles de tamanho de fonte
    document.getElementById("font-increase")?.addEventListener("click", () => {
      this.changeFontSize(1);
    });

    document.getElementById("font-decrease")?.addEventListener("click", () => {
      this.changeFontSize(-1);
    });

    document.getElementById("font-reset")?.addEventListener("click", () => {
      this.resetFontSize();
    });
  }

  changeFontSize(direction) {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    const newSize = currentSize + direction * 2;
    html.style.fontSize = `${newSize}px`;
    this.announceToScreenReader(
      `Tamanho da fonte ${direction > 0 ? "aumentado" : "diminuído"}`
    );
  }

  resetFontSize() {
    document.documentElement.style.fontSize = "16px";
    this.announceToScreenReader("Tamanho da fonte redefinido");
  }

  enhanceKeyboardNavigation() {
    // Navegação por teclado em dropdowns
    document.addEventListener("keydown", (e) => {
      const dropdown = e.target.closest(".dropdown");

      if (
        dropdown &&
        (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
      ) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }

      if (e.key === "Escape") {
        this.closeAllDropdowns();
      }

      // Navegação por tab com foco visível
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation");
    });
  }

  closeAllDropdowns() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  }

  setupFocusManagement() {
    // Gerenciar foco após navegação
    document.addEventListener("DOMContentLoaded", () => {
      const main = document.querySelector("main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus();
      }
    });
  }

  addScreenReaderSupport() {
    // Live regions para feedback dinâmico
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);

    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
    };
  }

  announceToScreenReader(message) {
    if (window.announceToScreenReader) {
      window.announceToScreenReader(message);
    }
  }
}

// CSS para screen readers
const screenReaderCSS = `
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 10000;
  text-decoration: none;
}

.skip-link:focus {
  top: 6px;
}

.keyboard-navigation *:focus {
  outline: 2px solid #005fcc !important;
  outline-offset: 2px !important;
}

.theme-switcher {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: auto;
}

.font-size-controls {
  display: flex;
  gap: 4px;
}
`;

// Adicionar CSS dinamicamente
const style = document.createElement("style");
style.textContent = screenReaderCSS;
document.head.appendChild(style);

// Inicializar quando DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.a11yManager = new A11yManager();
  });
} else {
  window.a11yManager = new A11yManager();
}
