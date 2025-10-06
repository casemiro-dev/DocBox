import { copiarProtocolo, copiarAtendimento, toggleModoDesk } from './modules/copy-functions.js';
import { apagar, transferir, titular } from './modules/form-actions.js';
import { limparDoc, validarDoc } from './modules/document-validation.js';
import { abrirModalMP, fecharModalMP, inserirTextoComTooltip } from './modules/modal-mp.js';
import { abrirModalFatura, fecharModalFatura, copiarFaturas, transferirFaturasParaRegistro } from './modules/modal-fatura.js';
import { criarTooltip, removerTooltip } from './modules/tooltip.js';
import "./modules/modal-verificacao-sup.js";
import { formatarTelefone } from './utils/helpers.js';


// FUNÇÃO PARA AS TAGS HTML FUNCIONAREM
function addToTextArea(tagHtml) {
  const caixa = document.getElementById("anotacoes");
  const posicaoAtual = caixa.selectionStart;
  const valorAtual = caixa.value;
  
  const novoValor = valorAtual.slice(0, posicaoAtual) + tagHtml + valorAtual.slice(caixa.selectionEnd);
  caixa.value = novoValor;
  
  const novaPosicao = posicaoAtual + tagHtml.length;
  caixa.setSelectionRange(novaPosicao, novaPosicao);
  caixa.focus();
}

// FUNÇÃO PARA FORMATAR O TELEFONE:
function configurarCampoTelefone() {
  const campo = document.getElementById("telefone");
  if (!campo) return;

  const safeSetValue = (el, novoValor, cursorPos) => {
    // evita setSelectionRange inválido e mantém cursor dentro do comprimento
    el.value = novoValor;
    const pos = Math.max(0, Math.min(cursorPos, el.value.length));
    try { el.setSelectionRange(pos, pos); } catch (e) { /* ignorar */ }
  };

  campo.addEventListener("input", (e) => {
    const rawBefore = campo.value;
    const cursorBefore = campo.selectionStart ?? campo.value.length;

    // aplica formatação, mas se formatar retornar vazio, NÃO sobrescreve automaticamente
    const formatted = formatarTelefone(rawBefore);
    if (formatted === "") {
      // se houver dígitos no rawBefore, tenta limpar só caracteres inválidos sem apagar tudo
      const onlyDigits = rawBefore.replace(/\D/g, "");
      if (onlyDigits.length === 0) {
        safeSetValue(campo, "", 0);
      }
      return;
    }

    // calcula ajuste simples do cursor: mantém distância do final aproximada
    const diffEnd = rawBefore.length - cursorBefore;
    const newCursor = Math.max(0, formatted.length - diffEnd);
    safeSetValue(campo, formatted, newCursor);
  });

  campo.addEventListener("paste", () => {
    setTimeout(() => {
      try {
        const f = formatarTelefone(campo.value);
        if (f) campo.value = f;
      } catch (err) { /* silencioso */ }
    }, 10);
  });

  campo.addEventListener("blur", () => {
    try {
      const f = formatarTelefone(campo.value);
      if (f) campo.value = f;
    } catch (err) { /* silencioso */ }
  });
}


// Tornar a função global para uso no HTML
window.addToTextArea = addToTextArea;

document.addEventListener("DOMContentLoaded", () => {

  configurarCampoTelefone(); 

  // Botões de fatura
  document.querySelectorAll(".btn-limpar-fatura").forEach(btn => {
    btn.addEventListener("click", () => {
      const linha = btn.parentElement;
      linha.querySelectorAll("input").forEach(input => input.value = "");
    });
  });


  // Botões principais
  document.getElementById("btn-copiar-protocolo")?.addEventListener("click", copiarProtocolo);
  document.getElementById("btn-copiar-atendimento")?.addEventListener("click", copiarAtendimento);
  document.getElementById("btn-apagar")?.addEventListener("click", apagar);
  document.getElementById("btn-transferir")?.addEventListener("click", () => {
  transferir();

  // Aplica formatação ao campo #telefone após transferência
  const campoTelefone = document.getElementById("telefone");
  if (campoTelefone) {
    const valorAtual = campoTelefone.value;
    const valorFormatado = formatarTelefone(valorAtual);
    if (valorFormatado) {
      campoTelefone.value = valorFormatado;
    }
  }
});

  document.getElementById("btn-limpar")?.addEventListener("click", limparDoc);
  document.getElementById("btn-validar")?.addEventListener("click", validarDoc);
  document.getElementById("btn-titular")?.addEventListener("click", titular);
  document.querySelector("#modal-mp .modal-close")?.addEventListener("click", fecharModalMP);
  document.querySelector("#modal-fatura .modal-close")?.addEventListener("click", fecharModalFatura);
  document.getElementById("btn-apagar-faturas")?.addEventListener("click", () => {
  document.querySelectorAll(".fatura-data, .fatura-valor, .fatura-link").forEach(input => {
    input.value = "";
  });
});

  // 💡 Tema claro/escuro
  document.getElementById("btn-tema")?.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
  });

  // 🔁 Alternância entre Faster e Desk
  document.getElementById("btn-faster-desk")?.addEventListener("click", toggleModoDesk);

  // 🟣 Modal M.P.
  document.getElementById("btn-mp")?.addEventListener("click", abrirModalMP);

  // Fechar modal ao clicar no overlay (fora do conteúdo)
  document.getElementById("modal-mp")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      fecharModalMP();
    }
  });

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharModalMP();
    }
  });

  // Event listeners para tooltips nos botões do modal
  document.addEventListener("mouseover", (e) => {
    if (e.target.matches(".categoria button[data-texto]")) {
      const texto = e.target.getAttribute("data-texto");
      criarTooltip(e.target, texto);
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.matches(".categoria button[data-texto]")) {
      removerTooltip();
    }
  });

  // Event listeners para os botões de categoria do modal M.P.
  document.querySelectorAll(".categoria button").forEach(button => {
    button.addEventListener("click", () => inserirTextoComTooltip(button));
  });

  // 💲 Botão de Fatura
  document.getElementById("btn-fatura")?.addEventListener("click", abrirModalFatura);

  // Fechar modal de fatura ao clicar no overlay (fora do conteúdo)
  document.getElementById("modal-fatura")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      fecharModalFatura();
    }
  });

  // Fechar modal de fatura com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharModalFatura();
    }
  });

  // Botão de copiar faturas
  document.getElementById("btn-copiar-faturas")?.addEventListener("click", copiarFaturas);
  // Botão de transferir faturas para o registro
  document.getElementById("btn-transferir-faturas")?.addEventListener("click", transferirFaturasParaRegistro);

  // ATUALIZAÇÃO DINÂMICA DO TÍTULO DA PÁGINA
  document.getElementById('cliente-nome')?.addEventListener('input', function() {
  const nomeCliente = this.value.trim();

  if (nomeCliente) {
    document.title = nomeCliente;
  } else {
    document.title = 'DocBox'; // ou deixe vazio: ''
  }
});
});

//Duplicar a página_________________________________________
document.getElementById("btn-duplicar")?.addEventListener("click", () => {
  window.open(window.location.href, "_blank");
});
