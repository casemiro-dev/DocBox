import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalUsuario() {
  document.getElementById("modal-usuario").showModal();
}

export function fecharModalUsuario() {
  document.getElementById("modal-usuario").close();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-usuario")?.addEventListener("click", abrirModalUsuario);
  document.querySelector("#modal-usuario .modal-close")?.addEventListener("click", fecharModalUsuario);
  document.getElementById("modal-usuario")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) fecharModalUsuario();
  });

  document.getElementById("btn-apagar-usuario")?.addEventListener("click", () => {
    ["fhtt", "usuario-nome", "cidade", "autenticacao", "plano", "endereco",
     "motivo", "nome", "numero", "risco", "cabo-drop"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  });

  document.getElementById("btn-copiar-usuario")?.addEventListener("click", () => {
    const hora = new Date().getHours();
    const saudacao = hora >= 18 ? "Olá boa noite, pode verificar?"
      : hora >= 12 ? "Olá boa tarde, pode verificar?"
      : "Olá bom dia, pode verificar?";

    const fhtt = document.getElementById("fhtt").value.trim();
    const usuario = document.getElementById("usuario-nome").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const autenticacao = document.getElementById("autenticacao").value;
    const plano = document.getElementById("plano").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const motivo = document.getElementById("motivo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const risco = document.getElementById("risco").value;
    const cabo = document.getElementById("cabo-drop").value;

    let texto = `${saudacao}\n\n`;
    if (fhtt) texto += `SN: ${fhtt}\n`;
    if (cidade) texto += `Cidade: ${cidade}\n`;
    if (autenticacao) texto += `Autenticação: ${autenticacao}\n`;
    if (plano) texto += `Plano: ${plano}\n`;
    if (endereco) texto += `Endereço: ${endereco}\n`;
    if (nome || usuario || numero || motivo) {
      texto += `${nome} (${usuario}) nº ${numero}. ${motivo}\n`;
    }
    if (risco) texto += `Apresenta risco de acidente: ${risco}\n`;
    if (cabo) texto += `Cabo drop: ${cabo}`;

    navigator.clipboard.writeText(texto).then(() => {
      mostrarMensagem("Informações copiadas com sucesso!");
    }).catch(() => {
      mostrarMensagem("Erro ao copiar!", "#ff0019");
    });
  });
});
