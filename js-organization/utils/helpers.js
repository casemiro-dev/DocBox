export function formatarTelefone(numero) {
  if (!numero) return "";
  let numeros = numero.replace(/\D/g, '');
  if (numeros.startsWith('55')) numeros = numeros.slice(2);
  if (numeros.length > 11) numeros = numeros.slice(-11);
  if (numeros.length === 11) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  if (numeros.length === 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  return '';
}

export function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarMensagem("Copiado! Verifique antes de colar as informações no ADM!");
  }).catch(() => {
    mostrarMensagem("Erro ao copiar!", "#ff0019");
  });
}

export function mostrarMensagem(texto, cor = "#28a745") {
  const area = document.getElementById("mensagem-area");
  if (!area) return;
  area.innerHTML = "";
  const msg = document.createElement("div");
  msg.className = "mensagem";
  msg.textContent = texto;
  msg.style.backgroundColor = cor;
  area.appendChild(msg);
  requestAnimationFrame(() => msg.classList.add("visivel"));
  setTimeout(() => {
    msg.classList.remove("visivel");
    setTimeout(() => msg.remove(), 300);
  }, 3000);
}

export function atualizarTituloPagina() {
  const nome = document.getElementById("cliente-nome")?.value.trim();
  document.title = nome || "DocBox";
}
