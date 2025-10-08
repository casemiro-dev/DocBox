// ===================================================================================
// ARQUIVO DE FUNÇÕES UTILITÁRIAS (HELPERS)
// Contém funções genéricas reutilizáveis em toda a aplicação.
// ===================================================================================

/**
 * Formata um número de telefone para os padrões (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 * Remove DDI 55, caracteres não numéricos e excesso de dígitos.
 * @param {string} numero O número de telefone a ser formatado.
 * @returns {string} O número formatado ou vazio se inválido.
 */
export function formatarTelefone(numero) {
  if (!numero) return "";
  let numeros = numero.replace(/\D/g, '');

  if (numeros.startsWith('55')) {
    numeros = numeros.slice(2);
  }

  if (numeros.length > 11) {
    numeros = numeros.slice(-11);
  }

  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return '';
}

/**
 * Adiciona uma tag HTML à área de texto de anotações.
 * @param {string} tagHtml A tag a ser inserida.
 */
export function addToTextArea(tagHtml) {
  const caixa = document.getElementById("anotacoes");
  if (caixa) {
    caixa.value += tagHtml;
  }
}

/**
 * Copia um texto para a área de transferência e exibe uma mensagem de confirmação.
 * @param {string} texto O texto a ser copiado.
 */
export function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarMensagem("Copiado! Verifique antes de colar as informações no ADM!");
  }).catch(err => {
    console.error("Falha ao copiar texto: ", err);
    mostrarMensagem("Erro ao copiar!", "#ff0019ff");
  });
}

/**
 * Exibe uma mensagem flutuante temporária na tela.
 * @param {string} texto O texto da mensagem.
 * @param {string} [cor] A cor de fundo da mensagem (formato CSS).
 */
export function mostrarMensagem(texto, cor = "#28a745") {
  const areaMensagem = document.getElementById("mensagem-area");
  if (!areaMensagem) return;

  while (areaMensagem.firstChild) {
    areaMensagem.removeChild(areaMensagem.firstChild);
  }

  const msg = document.createElement("div");
  msg.className = "mensagem";
  msg.textContent = texto;
  msg.style.backgroundColor = cor;

  areaMensagem.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("visivel");
  }, 10);

  setTimeout(() => {
    msg.classList.remove("visivel");
    setTimeout(() => msg.remove(), 300);
  }, 3000);
}

/**
 * Formata uma data do formato ISO (AAAA-MM-DD) para DD/MM/AAAA.
 * @param {string} dataISO A data em formato ISO.
 * @returns {string} A data formatada.
 */
export function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

/**
 * Converte um valor de turno para sua versão capitalizada (ex: "manha" -> "Manhã").
 * @param {string} turno O turno em minúsculas.
 * @returns {string} O turno formatado.
 */
export function formatarTurno(turno) {
  switch (turno.toLowerCase()) {
    case "manha": return "Manhã";
    case "tarde": return "Tarde";
    case "noite": return "Noite";
    default: return turno;
  }
}

/**
 * Atualiza o título da página com base no nome do cliente.
 * Se o campo estiver vazio, usa o título padrão "DocBox".
 */
export function atualizarTituloPagina() {
  const nomeCliente = document.getElementById("cliente-nome")?.value.trim();
  document.title = nomeCliente ? nomeCliente : 'DocBox';
}
