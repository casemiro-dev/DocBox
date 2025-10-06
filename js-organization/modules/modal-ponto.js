export function abrirModalPonto() {
  const modal = document.getElementById("modal-ponto");
  const conteudo = modal.querySelector(".modal-content");
  if (conteudo) conteudo.scrollTop = 0;
  modal.classList.add("active");
}

export function fecharModalPonto() {
  const modal = document.getElementById("modal-ponto");
  modal.classList.remove("active");
}