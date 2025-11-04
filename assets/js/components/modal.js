// modal.js - Sistema de Modais
export class Modal {
  constructor() {
    this.container = document.getElementById("modal-container");
    this.activeModal = null;
  }

  show(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      this.activeModal = modalId;
      document.body.style.overflow = "hidden";
    }
  }

  hide(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("show");
      this.activeModal = null;
      document.body.style.overflow = "";
    }
  }

  createModal(config) {
    const modalId = config.id || `modal-${Date.now()}`;
    const modalTemplate = this.getModalTemplate(modalId, config);

    const modalElement = document.createElement("div");
    modalElement.innerHTML = modalTemplate;

    this.container.appendChild(modalElement.firstElementChild);

    // Adicionar event listeners
    this.initModalEvents(modalId);

    return modalId;
  }

  getModalTemplate(id, config) {
    return `
            <div id="${id}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${config.title || "Modal"}</h3>
                        <button class="modal-close" onclick="App.modal.hide('${id}')">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${config.content || ""}
                    </div>
                    ${
                      config.footer
                        ? `
                    <div class="modal-footer">
                        ${config.footer}
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
  }

  initModalEvents(modalId) {
    const modal = document.getElementById(modalId);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.hide(modalId);
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal === modalId) {
        this.hide(modalId);
      }
    });
  }
}
