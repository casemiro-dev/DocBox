import { copiarAtendimento } from './modules/copy-functions.js';
import { apagar, transferir, titular } from './modules/form-actions.js';
import { limparDoc, validarDoc } from './modules/document-validation.js';
import { formatarTelefone, mostrarMensagem } from './utils/helpers.js';
import { agendarSalvar, restaurarEstado, limparEstado, configurarAutoSaveAntesSair, getTabId, resetTabId } from './utils/auto-save.js';

const CAMPOS_AUTO_SAVE = ["chat-protocolo", "cliente-nome", "telefone", "doc-id", "anotacoes"];

function configurarAutoSave() {
  for (const id of CAMPOS_AUTO_SAVE) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", agendarSalvar);
  }
}

function configurarTelefone() {
  const campo = document.getElementById("telefone");
  if (!campo) return;

  campo.addEventListener("input", () => {
    const raw = campo.value;
    const cursor = campo.selectionStart ?? raw.length;
    const fmt = formatarTelefone(raw);
    if (fmt === "") {
      if (raw.replace(/\D/g, "").length === 0) campo.value = "";
      return;
    }
    const diff = raw.length - cursor;
    const nc = Math.max(0, fmt.length - diff);
    campo.value = fmt;
    try { campo.setSelectionRange(nc, nc); } catch (e) {}
  });

  campo.addEventListener("paste", () => setTimeout(() => {
    const f = formatarTelefone(campo.value);
    if (f) campo.value = f;
  }, 10));
}

function configurarRipple() {
  document.querySelectorAll(".btn-primary, .btn-secondary, .btn-danger").forEach(btn => {
    btn.addEventListener("pointerdown", (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      btn.style.setProperty("--y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
}

function abrirNovaAba() {
  const url = window.location.origin + window.location.pathname + "?reset=true";
  window.open(url, "_blank");
}

function handleResetOnLoad() {
  if (window.location.search.includes("reset=true")) {
    resetTabId();
    document.title = "DocBox";
    const campos = ["chat-protocolo", "cliente-nome", "telefone", "doc-id", "anotacoes"];
    campos.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    limparEstado();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handleResetOnLoad();
  restaurarEstado();
  configurarTelefone();
  configurarAutoSave();
  configurarAutoSaveAntesSair();
  configurarRipple();

  document.getElementById("btn-copiar-atendimento")?.addEventListener("click", copiarAtendimento);
  document.getElementById("btn-transferir")?.addEventListener("click", transferir);

  document.getElementById("btn-apagar")?.addEventListener("click", () => {
    apagar();
    limparEstado();
  });

  document.getElementById("btn-nova-aba")?.addEventListener("click", abrirNovaAba);

  document.getElementById("btn-limpar")?.addEventListener("click", limparDoc);
  document.getElementById("btn-validar")?.addEventListener("click", validarDoc);
  document.getElementById("btn-titular")?.addEventListener("click", titular);

  // Tema
  function aplicarTema(temaClaro) {
    document.body.classList.toggle("tema-claro", temaClaro);
    const icon = document.querySelector("#btn-tema i");
    if (icon) {
      icon.className = temaClaro ? "fas fa-sun" : "fas fa-moon";
    }
  }

  const chaveTema = "docbox_tema_" + getTabId();
  const temaSalvo = localStorage.getItem(chaveTema) === "claro";
  aplicarTema(temaSalvo);

  document.getElementById("btn-tema")?.addEventListener("click", () => {
    const temaClaro = !document.body.classList.contains("tema-claro");
    aplicarTema(temaClaro);
    localStorage.setItem(chaveTema, temaClaro ? "claro" : "escuro");
  });

  document.getElementById("cliente-nome")?.addEventListener("input", function () {
    document.title = this.value.trim() || "DocBox";
  });
});
