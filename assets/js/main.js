// Arquivo principal - inicializa todos os sistemas
class MainApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalErrorHandling();
    this.setupProgressIndicator();
    this.setupAnalytics();
    this.initializeModules();
  }

  setupGlobalErrorHandling() {
    window.addEventListener("error", (event) => {
      console.error("Erro global:", event.error);
      this.logError(event.error);
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("Promise rejeitada:", event.reason);
      this.logError(event.reason);
    });
  }

  setupProgressIndicator() {
    // Barra de progresso para carregamento
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--primary-color, #2ecc71);
      width: 0%;
      z-index: 10000;
      transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 90) {
        clearInterval(interval);
      }
      progressBar.style.width = progress + "%";
    }, 200);

    window.addEventListener("load", () => {
      progressBar.style.width = "100%";
      setTimeout(() => {
        progressBar.style.opacity = "0";
        setTimeout(() => progressBar.remove(), 300);
      }, 300);
    });
  }

  setupAnalytics() {
    // Analytics básico e privacy-friendly
    this.trackPageView();

    window.addEventListener("beforeunload", () => {
      this.trackEvent("page_unload");
    });
  }

  trackPageView() {
    const analyticsData = {
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    console.log("Page View:", analyticsData);
    // Aqui você pode enviar para seu sistema de analytics
  }

  trackEvent(eventName, data = {}) {
    const eventData = {
      event: eventName,
      ...data,
      timestamp: new Date().toISOString(),
    };

    console.log("Event:", eventData);
    // Aqui você pode enviar para seu sistema de analytics
  }

  logError(error) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    console.error("Error logged:", errorData);
    // Aqui você pode enviar para seu sistema de log de erros
  }

  initializeModules() {
    // Inicializar módulos na ordem correta
    setTimeout(() => {
      // SPA Router deve ser inicializado primeiro
      if (window.SPARouter) {
        new window.SPARouter();
      }

      // Acessibilidade em seguida
      if (window.A11yManager) {
        window.a11yManager = new window.A11yManager();
      }

      // Depois os outros módulos
      if (window.FormValidator) {
        window.formValidator = new window.FormValidator();
      }

      if (window.PerformanceOptimizer) {
        window.performanceOptimizer = new window.PerformanceOptimizer();
      }

      console.log("🎉 Todos os módulos inicializados");
    }, 100);
  }
}

// Inicializar aplicação quando DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.mainApp = new MainApp();
  });
} else {
  window.mainApp = new MainApp();
}

// Exportar classes para uso global
window.MainApp = MainApp;
window.SPARouter = SPARouter;
window.A11yManager = A11yManager;
window.FormValidator = FormValidator;
window.PerformanceOptimizer = PerformanceOptimizer;
