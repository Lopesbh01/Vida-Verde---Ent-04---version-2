// header.js - Componente de Header
import { showToast } from "../utils/helpers.js";

export class Header {
  constructor() {
    this.container = document.getElementById("header-container");
  }

  render() {
    this.container.innerHTML = this.getTemplate();
    this.initEventListeners();
  }

  getTemplate() {
    return `
            <header class="header">
                <div class="container">
                    <div class="header-content">
                        <a href="/" class="logo" data-spa>
                            <i class="fas fa-seedling logo-icon"></i>
                            <span class="logo-text">Vida Verde</span>
                        </a>

                        <button class="mobile-menu-btn" aria-label="Abrir menu">
                            <i class="fas fa-bars"></i>
                        </button>

                        <nav class="nav">
                            <ul class="nav-list">
                                <li><a href="/" class="nav-link active" data-spa>Início</a></li>
                                <li class="dropdown">
                                    <a href="/projetos" class="nav-link dropdown-toggle" data-spa>
                                        Projetos <i class="fas fa-chevron-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="/projetos#nascentes" class="dropdown-link" data-spa>Nascentes Vivas</a></li>
                                        <li><a href="/projetos#cerrado" class="dropdown-link" data-spa>Cerrado em Pé</a></li>
                                        <li><a href="/projetos#mata-atlantica" class="dropdown-link" data-spa>Mata Atlântica</a></li>
                                    </ul>
                                </li>
                                <li><a href="/cadastro" class="nav-link" data-spa>Cadastro</a></li>
                                <li><a href="/contato" class="nav-link" data-spa>Contato</a></li>
                                <li><a href="/projetos#doar" class="btn btn-secondary btn-sm" data-spa>Doar</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="nav-overlay"></div>
            </header>
        `;
  }

  initEventListeners() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav");
    const navOverlay = document.querySelector(".nav-overlay");

    if (mobileMenuBtn && nav && navOverlay) {
      mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu());
      navOverlay.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Dropdown menus
    this.initDropdowns();
  }

  toggleMobileMenu() {
    const nav = document.querySelector(".nav");
    const navOverlay = document.querySelector(".nav-overlay");

    nav.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "";
  }

  initDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth > 991) {
          dropdown.classList.add("active");
        }
      });

      dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth > 991) {
          dropdown.classList.remove("active");
        }
      });
    });
  }

  updateActiveNav(path) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === path) {
        link.classList.add("active");
      }
    });
  }
}
