const STORAGE_PREFIX = "docbox_rascunho";
const DEBOUNCE_MS = 1500;

let timer = null;

export function getTabId() {
  let id = sessionStorage.getItem("docbox_tab_id");
  if (!id) {
    id = "tab_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
    sessionStorage.setItem("docbox_tab_id", id);
  }
  return id;
}

export function resetTabId() {
  sessionStorage.removeItem("docbox_tab_id");
}

function getKey() {
  return `${STORAGE_PREFIX}_${getTabId()}`;
}

const FIELDS = ["chat-protocolo", "cliente-nome", "telefone", "doc-id", "anotacoes"];

function coletarDados() {
  const dados = {};
  for (const id of FIELDS) {
    const el = document.getElementById(id);
    if (el) dados[id] = el.value;
  }
  return dados;
}

function restaurarDados(dados) {
  for (const id of FIELDS) {
    const el = document.getElementById(id);
    if (el && dados[id] !== undefined) el.value = dados[id];
  }
}

function mostrarIndicador(texto) {
  const el = document.getElementById("auto-save-indicator");
  if (!el) return;
  el.textContent = texto;
  el.classList.add("visible");
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove("visible"), 2000);
}

export function salvarEstado() {
  clearTimeout(timer);
  try {
    const dados = coletarDados();
    localStorage.setItem(getKey(), JSON.stringify(dados));
    mostrarIndicador("Salvo ✔");
  } catch {
    // localStorage indisponível
  }
}

export function agendarSalvar() {
  clearTimeout(timer);
  timer = setTimeout(salvarEstado, DEBOUNCE_MS);
}

export function configurarAutoSaveAntesSair() {
  window.addEventListener("beforeunload", salvarEstado);
}

export function restaurarEstado() {
  if (window.location.search.includes("reset=true")) return;
  try {
    const raw = localStorage.getItem(getKey());
    if (!raw) return;
    const dados = JSON.parse(raw);
    if (typeof dados === "object" && dados !== null) {
      restaurarDados(dados);
    }
  } catch {
    // ignorar
  }
}

export function limparEstado() {
  try {
    localStorage.removeItem(getKey());
  } catch {
    // ignorar
  }
}
