// Sistema de validação de formulários acessível
class FormValidator {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormListeners();
    this.setupRealTimeValidation();
  }

  setupFormListeners() {
    document.addEventListener("submit", (e) => {
      const form = e.target;
      if (form.tagName === "FORM") {
        this.validateForm(form, e);
      }
    });
  }

  setupRealTimeValidation() {
    document.addEventListener(
      "blur",
      (e) => {
        if (e.target.matches("input, select, textarea")) {
          this.validateField(e.target);
        }
      },
      true
    );

    document.addEventListener("input", (e) => {
      if (
        e.target.matches('input[type="text"], input[type="email"], textarea')
      ) {
        this.clearFieldError(e.target);
      }
    });
  }

  validateForm(form, event) {
    let isValid = true;
    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
      this.announceFormErrors(form);
    } else {
      this.showSuccessMessage(form);
    }

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute("required");
    const type = field.type;

    this.clearFieldError(field);

    // Validação de campo obrigatório
    if (isRequired && !value) {
      this.showFieldError(field, "Este campo é obrigatório");
      return false;
    }

    // Validações específicas por tipo
    switch (type) {
      case "email":
        if (value && !this.isValidEmail(value)) {
          this.showFieldError(field, "Por favor, insira um email válido");
          return false;
        }
        break;

      case "tel":
        if (value && !this.isValidPhone(value)) {
          this.showFieldError(field, "Por favor, insira um telefone válido");
          return false;
        }
        break;

      case "date":
        if (value && !this.isValidDate(value)) {
          this.showFieldError(field, "Por favor, insira uma data válida");
          return false;
        }
        break;
    }

    // Validação de comprimento mínimo
    const minLength = field.getAttribute("minlength");
    if (minLength && value.length < parseInt(minLength)) {
      this.showFieldError(
        field,
        `Mínimo de ${minLength} caracteres necessários`
      );
      return false;
    }

    return true;
  }

  showFieldError(field, message) {
    field.setAttribute("aria-invalid", "true");

    // Criar elemento de erro
    let errorElement = field.parentNode.querySelector(".field-error");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "field-error";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.setAttribute("role", "alert");

    // Adicionar classe de erro ao campo
    field.classList.add("error");

    // Focar no campo com erro
    field.focus();
  }

  clearFieldError(field) {
    field.removeAttribute("aria-invalid");
    field.classList.remove("error");

    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  announceFormErrors(form) {
    const errorFields = form.querySelectorAll('[aria-invalid="true"]');
    const errorCount = errorFields.length;

    if (errorCount > 0 && window.announceToScreenReader) {
      window.announceToScreenReader(
        `Formulário contém ${errorCount} erro${
          errorCount > 1 ? "s" : ""
        }. Por favor, corrija os campos destacados.`
      );
    }
  }

  showSuccessMessage(form) {
    if (window.announceToScreenReader) {
      window.announceToScreenReader("Formulário enviado com sucesso!");
    }

    // Mostrar mensagem visual de sucesso
    const successMessage = document.createElement("div");
    successMessage.className = "alert alert-success";
    successMessage.setAttribute("role", "alert");
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <strong>Sucesso!</strong> Formulário enviado com sucesso.
    `;

    form.parentNode.insertBefore(successMessage, form);

    // Remover mensagem após 5 segundos
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  isValidDate(date) {
    return !isNaN(Date.parse(date));
  }
}

// CSS para validação de formulários
const formValidationCSS = `
.field-error {
  color: #d93025;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

input.error,
select.error,
textarea.error {
  border-color: #d93025 !important;
  background-color: #fff8f8;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.alert-success i {
  margin-right: 0.5rem;
}
`;

// Adicionar CSS dinamicamente
const style = document.createElement("style");
style.textContent = formValidationCSS;
document.head.appendChild(style);

// Inicializar validador
document.addEventListener("DOMContentLoaded", () => {
  window.formValidator = new FormValidator();
});
