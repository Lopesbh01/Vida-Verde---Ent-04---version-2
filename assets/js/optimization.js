// Sistema de otimização e performance
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupPreloading();
    this.setupCaching();
    this.setupPerformanceMonitoring();
  }

  setupLazyLoading() {
    // Lazy loading para imagens
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          img.setAttribute("loading", "eager");
          observer.unobserve(img);
        }
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      const lazyImages = document.querySelectorAll("img[data-src]");
      lazyImages.forEach((img) => {
        imageObserver.observe(img);
      });
    });
  }

  setupPreloading() {
    // Preload de recursos críticos
    const criticalResources = [
      "/assets/css/style.css",
      "/assets/css/layout.css",
      "/assets/css/components.css",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource;
      link.as = "style";
      document.head.appendChild(link);
    });
  }

  setupCaching() {
    // Service Worker para cache (se suportado)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registrado com sucesso:", registration);
          })
          .catch((error) => {
            console.log("Falha no registro do Service Worker:", error);
          });
      });
    }
  }

  setupPerformanceMonitoring() {
    // Monitorar métricas de performance
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.duration}ms`);
        });
      });

      observer.observe({ entryTypes: ["navigation", "paint", "resource"] });
    }

    // Monitorar Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });

    // Monitorar Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log("CLS atual:", clsValue);
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  }

  // Otimização para conexões lentas
  setupConnectionAwareLoading() {
    const connection = navigator.connection;

    if (connection) {
      if (connection.saveData) {
        this.enableDataSaverMode();
      }

      if (connection.effectiveType.includes("2g")) {
        this.enableLowBandwidthMode();
      }
    }
  }

  enableDataSaverMode() {
    // Desabilitar recursos não essenciais
    const nonEssentialImages = document.querySelectorAll(
      'img[data-essential="false"]'
    );
    nonEssentialImages.forEach((img) => (img.style.display = "none"));

    // Desabilitar autoplay de vídeos
    const videos = document.querySelectorAll("video[autoplay]");
    videos.forEach((video) => {
      video.autoplay = false;
      video.setAttribute("data-paused", "true");
    });
  }

  enableLowBandwidthMode() {
    // Reduzir qualidade de imagens
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      const originalSrc = img.dataset.src;
      if (originalSrc.includes("high-quality")) {
        img.dataset.src = originalSrc.replace("high-quality", "low-quality");
      }
    });
  }
}

// Funções utilitárias de performance
const PerformanceUtils = {
  // Debounce para otimizar eventos
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para otimizar eventos
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Prefetch de páginas prováveis
  prefetchPages() {
    const links = document.querySelectorAll("a[data-spa]");
    links.forEach((link) => {
      const href = link.href;
      const linkElement = document.createElement("link");
      linkElement.rel = "prefetch";
      linkElement.href = href;
      document.head.appendChild(linkElement);
    });
  },
};

// Inicializar otimizador
document.addEventListener("DOMContentLoaded", () => {
  window.performanceOptimizer = new PerformanceOptimizer();
  PerformanceUtils.prefetchPages();
});

// Service Worker básico
if ("serviceWorker" in navigator) {
  const swCode = `
    const CACHE_NAME = 'vida-verde-v1.0.0';
    const urlsToCache = [
      '/',
      '/index.html',
      '/projeto.html',
      '/cadastro.html',
      '/assets/css/style.css',
      '/assets/css/layout.css',
      '/assets/css/components.css',
      '/assets/css/responsive.css',
      '/assets/js/main.js',
      '/assets/js/a11y.js'
    ];

    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then((cache) => cache.addAll(urlsToCache))
      );
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });
  `;

  // Criar blob para o Service Worker
  const blob = new Blob([swCode], { type: "application/javascript" });
  const swUrl = URL.createObjectURL(blob);

  // Tentar registrar o Service Worker
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => console.log("SW registered"))
    .catch((error) => console.log("SW registration failed"));
}
