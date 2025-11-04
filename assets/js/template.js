// templates.js - Sistema de gerenciamento de templates
export class Templates {
  constructor() {
    this.templates = new Map();
    this.basePath = "/templates/";
    this.init();
  }

  async init() {
    // Pré-carregar templates comuns
    await this.preloadTemplates();
  }

  async preloadTemplates() {
    const commonTemplates = ["home", "projetos", "cadastro", "contato"];

    for (const templateName of commonTemplates) {
      await this.loadTemplate(templateName);
    }
  }

  async getTemplate(templateName) {
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName);
    }

    return await this.loadTemplate(templateName);
  }

  async loadTemplate(templateName) {
    try {
      const response = await fetch(`${this.basePath}${templateName}.html`);

      if (!response.ok) {
        throw new Error(`Template ${templateName} não encontrado`);
      }

      const template = await response.text();
      this.templates.set(templateName, template);

      return template;
    } catch (error) {
      console.error("Erro ao carregar template:", error);
      return this.getErrorTemplate();
    }
  }

  getErrorTemplate() {
    return `
            <div class="error-template">
                <h2>Erro ao carregar página</h2>
                <p>Desculpe, ocorreu um erro ao carregar o conteúdo.</p>
                <a href="/" data-spa class="btn btn-primary">Voltar para Home</a>
            </div>
        `;
  }

  // Método para renderizar templates com dados dinâmicos
  render(template, data = {}) {
    let rendered = template;

    // Substituir placeholders {{key}} pelos valores
    Object.keys(data).forEach((key) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      rendered = rendered.replace(placeholder, data[key]);
    });

    return rendered;
  }

  // Método para criar elementos DOM a partir de templates
  createElement(templateString) {
    const template = document.createElement("template");
    template.innerHTML = templateString.trim();
    return template.content.firstElementChild;
  }
}
