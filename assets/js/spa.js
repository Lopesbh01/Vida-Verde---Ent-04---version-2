// Sistema SPA para navegação suave
class SPARouter {
  constructor() {
    this.routes = {
      "/": "index.html",
      "/projetos": "projeto.html",
      "/cadastro": "cadastro.html",
    };
    this.init();
  }

  init() {
    // Interceptar clicks em links com data-spa
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-spa]");
      if (link) {
        e.preventDefault();
        this.navigate(link.href);
      }
    });

    // Manipular histórico do navegador
    window.addEventListener("popstate", () => {
      this.loadPage(window.location.pathname);
    });

    // Carregar página inicial
    this.loadPage(window.location.pathname);
  }

  async navigate(url) {
    const path = new URL(url).pathname;
    history.pushState({}, "", path);
    await this.loadPage(path);

    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Anunciar para leitores de tela
    if (window.announceToScreenReader) {
      window.announceToScreenReader(
        `Página ${this.getPageTitle(path)} carregada`
      );
    }
  }

  async loadPage(path) {
    const route = this.routes[path] || this.routes["/"];

    try {
      const response = await fetch(route);
      if (!response.ok) throw new Error("Página não encontrada");

      const html = await response.text();

      if (path === "/") {
        this.updateMainContent(html);
      } else {
        document.querySelector("main").innerHTML =
          this.extractMainContent(html);
      }

      // Atualizar título da página
      document.title = this.extractPageTitle(html);

      // Re-inicializar componentes JavaScript
      this.reinitializeComponents();
    } catch (error) {
      console.error("Erro ao carregar página:", error);
      this.showErrorPage();
    }
  }

  extractMainContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const mainContent = doc.querySelector("main");
    return mainContent
      ? mainContent.innerHTML
      : "<h1>Conteúdo não encontrado</h1>";
  }

  updateMainContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const heroSection = doc.querySelector(".hero");
    const mainContent = doc.querySelector(".container");

    if (heroSection) {
      document.querySelector(".hero").replaceWith(heroSection);
    }

    if (mainContent) {
      document.querySelector("main .container").replaceWith(mainContent);
    }
  }

  extractPageTitle(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.title || "Vida Verde - Preservação Ambiental";
  }

  getPageTitle(path) {
    const titles = {
      "/": "Início",
      "/projetos": "Nossos Projetos",
      "/cadastro": "Cadastro de Voluntários",
    };
    return titles[path] || "Página";
  }

  reinitializeComponents() {
    // Re-inicializar todos os componentes JavaScript
    if (window.a11yManager) {
      window.a11yManager.init();
    }

    // Re-inicializar validação de formulários
    if (window.formValidator) {
      window.formValidator.init();
    }
  }

  showErrorPage() {
    document.querySelector("main").innerHTML = `
      <section class="section">
        <div class="container">
          <div class="card">
            <div class="card-body text-center">
              <h2>Página não encontrada</h2>
              <p>A página que você está tentando acessar não existe.</p>
              <a href="/" class="btn btn-primary" data-spa>Voltar para o Início</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

// Inicializar SPA
document.addEventListener("DOMContentLoaded", () => {
  new SPARouter();
});
