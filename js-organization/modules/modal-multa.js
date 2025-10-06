export function abrirModalMulta() {
  const modal = document.getElementById("modal-multa");
  const conteudo = modal.querySelector(".modal-content");
  if (conteudo) conteudo.scrollTop = 0;
  modal.classList.add("active");
}

export function fecharModalMulta() {
  const modal = document.getElementById("modal-multa");
  modal.classList.remove("active");
}