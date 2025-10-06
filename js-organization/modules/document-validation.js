import { validarCPF, validarCNPJ } from '../utils/validators.js';
import { mostrarMensagem } from '../utils/helpers.js';

export function limparDoc() {
  const input = document.getElementById("doc-id");
  const texto = input.value.replace(/[^\d]/g, "");
  if (texto.length === 11 && validarCPF(texto)) {
    input.value = texto;
    navigator.clipboard.writeText(texto);
    mostrarMensagem("Copiado sem pontuação ✔");
  } else if (texto.length === 14 && validarCNPJ(texto)) {
    input.value = texto;
    navigator.clipboard.writeText(texto);
    mostrarMensagem("Copiado sem pontuação ✔");
  } else {
    mostrarMensagem("Documento inválido ❌");
  }
}

export function validarDoc() {
  const input = document.getElementById("doc-id");
  const texto = input.value.replace(/[^\d]/g, "");
  let formatado = "";

  if (texto.length === 11) {
    if (!validarCPF(texto)) {
      mostrarMensagem("CPF inválido ❌");
      return;
    }
    formatado = texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (texto.length === 14) {
    if (!validarCNPJ(texto)) {
      mostrarMensagem("CNPJ inválido ❌");
      return;
    }
    formatado = texto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  } else {
    mostrarMensagem("Documento inválido ❌");
    return;
  }

  input.value = formatado;
  navigator.clipboard.writeText(formatado);
  mostrarMensagem("Copiado com pontuação ✔");
}

