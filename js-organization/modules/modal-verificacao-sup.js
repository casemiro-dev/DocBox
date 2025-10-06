document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-usuario");

  // Abrir modal
  document.getElementById("btn-usuario")?.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar com botão
  document.querySelector("#modal-usuario .modal-close")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar ao clicar fora
  modal?.addEventListener("click", (e) => {
    const conteudo = document.querySelector("#modal-usuario .modal-content");
    if (!conteudo.contains(e.target)) {
      modal.style.display = "none";
    }
  });

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  // Apagar campos
  document.getElementById("btn-apagar-usuario")?.addEventListener("click", () => {
    ["fhtt", "usuario-nome", "cidade", "autenticacao", "plano", "endereco", "motivo", "risco", "cabo-drop"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  });

  // Copiar dados
  document.getElementById("btn-copiar-usuario")?.addEventListener("click", () => {
    const hora = new Date().getHours();
    let saudacao = hora >= 18 ? "Boa noite!" : hora >= 12 ? "Boa tarde!" : "Bom dia!";

    const campos = {
      fhtt: "FHTT",
      usuario: "Usuário",
      cidade: "Cidade",
      autenticacao: "Autenticação",
      plano: "Plano",
      endereco: "Endereço",
      motivo: "Motivo da verificação",
      risco: "Oferece risco",
      cabo: "Cabo drop"
    };

    const valores = {
      fhtt: document.getElementById("fhtt").value.trim(),
      usuario: document.getElementById("usuario-nome").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      autenticacao: document.getElementById("autenticacao").value,
      plano: document.getElementById("plano").value.trim(),
      endereco: document.getElementById("endereco").value.trim(),
      motivo: document.getElementById("motivo").value.trim(),
      risco: document.getElementById("risco").value,
      cabo: document.getElementById("cabo-drop").value
    };

    let texto = `${saudacao} Poderia verificar o caso, por gentileza?\n\n`;
    for (const key in valores) {
      if (valores[key]) {
        texto += `${campos[key]}: ${valores[key]}\n`;
      }
    }

    navigator.clipboard.writeText(texto).then(() => {
      alert("Informações copiadas com sucesso!");
    });
  });
});