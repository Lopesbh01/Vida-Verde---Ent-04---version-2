// router.js - Sistema de roteamento SPA
import { Templates } from "./templates.js";
import { showToast } from "./utils/helpers.js";

export class Router {
  constructor() {
    this.routes = {
      "/": "home",
      "/projetos": "projetos",
      "/cadastro": "cadastro",
      "/contato": "contato",
    };

    this.templates = new Templates();
    this.currentPath = "/";
  }

  init() {
    // Configurar popstate para navegação do browser
    window.addEventListener("popstate", (e) => {
      this.handleRouteChange();
    });

    // Rota inicial
    this.handleRouteChange();
  }

  async handleRouteChange() {
    const path = window.location.pathname;
    this.currentPath = path;

    try {
      await this.loadRoute(path);
      this.updateActiveNav();
      this.scrollToTop();
    } catch (error) {
      console.error("Erro ao carregar rota:", error);
      this.loadErrorPage();
    }
  }

  async loadRoute(path) {
    const routeName = this.routes[path] || "home";
    const appElement = document.getElementById("app");

    // Mostrar loading
    appElement.innerHTML = this.getLoadingTemplate();

    // Carregar template
    const template = await this.templates.getTemplate(routeName);
    appElement.innerHTML = template;

    // Executar scripts específicos da página
    this.executePageScripts(routeName);

    // Disparar evento de rota carregada
    this.dispatchRouteEvent(routeName);
  }

  getLoadingTemplate() {
    return `
            <div class="loading-container">
                <div class="loading-spinner">
                    <i class="fas fa-seedling"></i>
                </div>
                <p>Carregando...</p>
            </div>
        `;
  }

  executePageScripts(routeName) {
    switch (routeName) {
      case "projetos":
        this.initProjetosPage();
        break;
      case "cadastro":
        this.initCadastroPage();
        break;
      case "contato":
        this.initContatoPage();
        break;
      default:
        this.initHomePage();
    }
  }

  initHomePage() {
    // Inicializar componentes específicos da home
    console.log("Página inicial carregada");
  }

  initProjetosPage() {
    // Inicializar funcionalidades da página de projetos
    this.initDonationSystem();
    this.initProjectFilters();
  }

  initCadastroPage() {
    // Inicializar formulário de cadastro
    this.initFormValidation();
    this.initMaskedInputs();
  }

  initContatoPage() {
    // Inicializar formulário de contato
    this.initFormValidation();
  }

  initDonationSystem() {
    const donationModal = document.getElementById("modalDoacao");
    if (donationModal) {
      donationModal.addEventListener("click", (e) => {
        if (e.target === donationModal) {
          this.closeModal("modalDoacao");
        }
      });
    }
  }

  initProjectFilters() {
    // Sistema de filtros para projetos
    const filterButtons = document.querySelectorAll(".project-filter");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        this.filterProjects(filter);
      });
    });
  }

  filterProjects(filter) {
    const projects = document.querySelectorAll(".project-card");
    projects.forEach((project) => {
      if (filter === "all" || project.dataset.category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  }

  initFormValidation() {
    // Validação básica de formulários
    const forms = document.querySelectorAll("form[data-spa-submit]");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
          showToast(
            "Por favor, preencha todos os campos obrigatórios.",
            "error"
          );
        }
      });
    });
  }

  initMaskedInputs() {
    // Máscaras para CPF e telefone
    const cpfInput = document.getElementById("cpf");
    const telInput = document.getElementById("telefone");

    if (cpfInput) {
      cpfInput.addEventListener("input", this.maskCPF);
    }
    if (telInput) {
      telInput.addEventListener("input", this.maskTelefone);
    }
  }

  maskCPF(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = value;
  }

  maskTelefone(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = value;
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });

    return isValid;
  }

  navigate(path) {
    window.history.pushState({}, "", path);
    this.handleRouteChange();
  }

  updateActiveNav() {
    // Atualizar navegação ativa
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === this.currentPath) {
        link.classList.add("active");
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  dispatchRouteEvent(routeName) {
    const event = new CustomEvent("routeChanged", {
      detail: { route: routeName },
    });
    window.dispatchEvent(event);
  }

  loadErrorPage() {
    const appElement = document.getElementById("app");
    appElement.innerHTML = `
            <div class="error-container">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Página não encontrada</h2>
                <p>A página que você está procurando não existe.</p>
                <a href="/" data-spa class="btn btn-primary">Voltar para Home</a>
            </div>
        `;
  }
}
