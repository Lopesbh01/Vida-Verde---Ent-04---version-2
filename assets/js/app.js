// app.js - Arquivo principal da SPA
import { Router } from "./router.js";
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { Modal } from "./components/modal.js";
import { showToast } from "./utils/helpers.js";

class App {
  constructor() {
    this.router = new Router();
    this.header = new Header();
    this.footer = new Footer();
    this.modal = new Modal();

    this.init();
  }

  init() {
    // Inicializar componentes
    this.header.render();
    this.footer.render();

    // Inicializar router
    this.router.init();

    // Configurar event listeners globais
    this.setupGlobalListeners();

    console.log("🚀 Vida Verde SPA inicializada!");
  }

  setupGlobalListeners() {
    // Listener para links SPA
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-spa]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        this.router.navigate(href);
      }
    });

    // Listener para formulários
    document.addEventListener("submit", (e) => {
      const form = e.target;
      if (form.dataset.spaSubmit) {
        e.preventDefault();
        this.handleFormSubmit(form);
      }
    });
  }

  async handleFormSubmit(form) {
    const formData = new FormData(form);
    const action = form.getAttribute("action");

    try {
      // Simular envio de formulário
      showToast("Formulário enviado com sucesso!", "success");
      form.reset();

      // Se for cadastro, redirecionar para home
      if (form.id === "form-cadastro") {
        setTimeout(() => {
          this.router.navigate("/");
        }, 2000);
      }
    } catch (error) {
      showToast("Erro ao enviar formulário. Tente novamente.", "error");
    }
  }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new App();
});

// Exportar para uso global (desenvolvimento)
window.App = App;
