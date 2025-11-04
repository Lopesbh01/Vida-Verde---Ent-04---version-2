// validation.js - Funções de validação
export class Validator {
  static required(value) {
    return (
      value !== null && value !== undefined && value.toString().trim() !== ""
    );
  }

  static email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  static cpf(value) {
    const cpf = value.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    // Validação básica de CPF
    if (/^(\d)\1+$/.test(cpf)) return false;

    return true;
  }

  static phone(value) {
    const phone = value.replace(/\D/g, "");
    return phone.length >= 10 && phone.length <= 11;
  }

  static minLength(value, min) {
    return value.length >= min;
  }

  static maxLength(value, max) {
    return value.length <= max;
  }

  static between(value, min, max) {
    const num = parseFloat(value);
    return num >= min && num <= max;
  }
}

export function validateForm(form, rules) {
  const errors = {};
  const formData = new FormData(form);

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    const value = formData.get(fieldName) || "";

    for (const rule of fieldRules) {
      if (!rule.validator(value, ...rule.params)) {
        errors[fieldName] = rule.message;
        if (field) {
          field.classList.add("error");
        }
        break;
      } else {
        if (field) {
          field.classList.remove("error");
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
