// ── Utilitários ──
function formatarTelefone(numero) {
  const numeros = numero.replace(/\D/g, '');
  const semCodigoPais = numeros.startsWith('55') ? numeros.slice(2) : numeros;
  return semCodigoPais;
}

function addToTextArea(tagHtml) {
  const caixa = document.getElementById("anotacoes");
  caixa.value += tagHtml;
}

// ── Controle de formato ──
let modoDesk = false;

// ── Funções de copiar ──
function copiarProtocolo() {
  const anotacoes = document.getElementById("anotacoes").value.trim();
  const protocoloChat = document.getElementById("chat-protocolo").value.trim();
  const empresarial = document.querySelectorAll(".checkboxes input")[2].checked;

  const pontoFinal = anotacoes.indexOf(".");
  const textoInicial = pontoFinal !== -1 ? anotacoes.slice(0, pontoFinal + 1) : anotacoes;

  let resultado = `${textoInicial}<hr>`;

  if (protocoloChat !== "") {
    resultado += `<b><font color=blue> Protocolo do Chat: ${protocoloChat} </font></b><hr>`;
  }

  if (empresarial) {
    resultado += `<b>EMPRESA</b><hr>`;
  }

  copiarTexto(resultado);
}

function copiarAtendimento() {
  const anotacoes = document.getElementById("anotacoes").value.trim();
  const protocoloChat = document.getElementById("chat-protocolo").value.trim();
  const nomeCliente = document.getElementById("cliente-nome").value.trim();
  const telefoneRaw = document.getElementById("telefone").value.trim();
  const telefone = formatarTelefone(telefoneRaw);
  const protocoloADM = document.getElementById("prot-gerado").value.trim();
  const protocoloReferente = document.getElementById("prot-ref-adm").value.trim();
  const turno = document.getElementById("periodo-agendamento").value;
  const data1 = document.getElementById("data1").value;
  const data2 = document.getElementById("data2").value;
  const data3 = document.getElementById("data3").value;
  const disponibilidade = document.getElementById("disponibilidade").value.trim();
  const referencia = document.getElementById("referencia").value.trim();
  const maiorIdade = document.querySelectorAll(".checkboxes input")[0].checked;
  const garantia = document.querySelectorAll(".checkboxes input")[1].checked;

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dataFormatada = `${dia}/${mes}`;

  let resultado = "";

  if (modoDesk) {
    // 🔁 Modo Desk
    if (protocoloChat !== "") {
      resultado += `Protocolo do chat: ${protocoloChat}\n`;
      resultado += `Cliente ${nomeCliente} via chat no nº ${telefone}. `;
    } else {
      resultado += `Cliente ${nomeCliente} via tel no nº ${telefone}. `;
    }
    resultado += anotacoes;
  } else {
    // ⚡ Modo Faster
    if (protocoloChat !== "") {
      resultado += `<b><font color=blue>Protocolo do Chat: ${protocoloChat}</font></b><hr>`;
    }
    resultado += `<b><font color=blue>Padrão Fibra</font></b><hr>`;
    resultado += `${dataFormatada}→ Atendimento realizado com Sr(a). ${nomeCliente} via ${protocoloChat !== "" ? "chat" : "tel"} no nº ${telefone}.<br>`;
    resultado += anotacoes;

  // 🗓️ Agendamento
if (turno || data1 || data2 || data3 || disponibilidade || referencia) {
  if (turno) {
    resultado += `<hr><b>Agendamento:</b> ${formatarTurno(turno)}`;
  }
  if (data1) resultado += `  - ${formatarData(data1)}`;
  if (data2) resultado += ` - ${formatarData(data2)}`;
  if (data3) resultado += ` - ${formatarData(data3)}`;
  resultado += `<br>`;
  if (disponibilidade) resultado += `<b>Disponibilidade geral:</b> ${disponibilidade}<br>`;
  if (referencia) resultado += `<b>Ponto de referência:</b> ${referencia}<br>`;
}

    if (maiorIdade) {
      resultado += `<hr>Cliente ficou ciente de que deve ter um maior de idade no local no dia da visita.`;
    }

    if (garantia) {
      resultado += `<b>GARANTIA DE INSTALAÇÃO.</b>`;
    }

    if (protocoloADM !== "") {
      resultado += `<hr><b>Protocolo ADM:</b> ${protocoloADM}.`;
    }

    if (protocoloReferente !== "") {
      resultado += `<br><b>Protocolo Referente:</b> ${protocoloReferente}.`;
    }
  }

  copiarTexto(resultado);
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}
function formatarTurno(turno) {
  switch (turno.toLowerCase()) {
    case "manha": return "Manhã";
    case "tarde": return "Tarde";
    case "noite": return "Noite";
    default: return turno;
  }
}


// ── Utilitários extras ──
function apagar() {
  // Campos principais
  document.getElementById("chat-protocolo").value = "";
  document.getElementById("prot-gerado").value = "";
  document.getElementById("prot-ref-adm").value = "";
  document.getElementById("cliente-nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("doc-id").value = "";
  document.getElementById("anotacoes").value = "";
  document.getElementById("mensagem-copiado").textContent = "";

  // Campos de agendamento
  document.getElementById("periodo-agendamento").value = "";
  document.getElementById("data1").value = "";
  document.getElementById("data2").value = "";
  document.getElementById("data3").value = "";
  document.getElementById("disponibilidade").value = "";
  document.getElementById("referencia").value = "";

  // Checkboxes
  const checkboxes = document.querySelectorAll(".checkboxes input");
  checkboxes.forEach(checkbox => checkbox.checked = false);
}

function transferir() {
  navigator.clipboard.readText()
    .then(texto => {
      const protocoloMatch = texto.match(/Número de protocolo:\s*(\d{8,})/);
      const protocolo = protocoloMatch ? protocoloMatch[1] : "";

      const nomeMatch = texto.match(/Nome:\s*([\s\S]*?)(?=Telefone:)/);
      const nome = nomeMatch ? nomeMatch[1].trim() : "";

      const telMatch = texto.match(/Telefone:\s*(\d+)/);
      let telefone = "";
      if (telMatch) {
        let nums = telMatch[1];
        if (nums.length > 11) {
          nums = nums.slice(-11);
        }
        telefone = formatarTelefone(nums);
      }

      const cpfMatch = texto.match(/CPF\s*Cliente:\s*([\d\.\-]+)/i);
      let cpfRaw = cpfMatch ? cpfMatch[1] : "";
      cpfRaw = cpfRaw.replace(/\D/g, "");

      document.getElementById("chat-protocolo").value = protocolo;
      document.getElementById("cliente-nome").value = nome;
      document.getElementById("telefone").value = telefone;
      document.getElementById("doc-id").value = cpfRaw;

      const msg = document.getElementById("mensagem-copiado");
      msg.textContent = "Dados transferidos com sucesso!";
      setTimeout(() => { msg.textContent = ""; }, 3000);
    })
    .catch(err => {
      console.error("Erro ao ler a área de transferência:", err);
    });
}

function copiarTexto(texto) {
  const temp = document.createElement("textarea");
  temp.value = texto;
  document.body.appendChild(temp);
  temp.select();
  navigator.clipboard.writeText(texto);
  document.body.removeChild(temp);

  const msg = document.getElementById("mensagem-copiado");
  msg.textContent = "Copiado! Verifique antes de colar as informações no ADM!";
  setTimeout(() => { msg.textContent = ""; }, 3000);
}

// ── CPF/CNPJ ──
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2, numeros = cnpj.substring(0, tamanho), digitos = cnpj.substring(tamanho);
  let soma = 0, pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado === parseInt(digitos.charAt(1));
}

function limparDoc() {
  const input = document.getElementById('doc-id');
  const texto = input.value.replace(/[^\d]/g, '');
  if (texto.length === 11 && validarCPF(texto)) {
    input.value = texto;
    navigator.clipboard.writeText(texto);
    mostrarMensagem('Copiado sem pontuação ✔');
  } else if (texto.length === 14 && validarCNPJ(texto)) {
    input.value = texto;
    navigator.clipboard.writeText(texto);
    mostrarMensagem('Copiado sem pontuação ✔');
  } else {
    mostrarMensagem('Documento inválido ❌');
  }
}

function validarDoc() {
  const input = document.getElementById('doc-id');
  const texto = input.value.replace(/[^\d]/g, '');
  let formatado = '';

  if (texto.length === 11) {
    if (!validarCPF(texto)) {
      mostrarMensagem('CPF inválido ❌');
      return;
    }
    formatado = texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (texto.length === 14) {
    if (!validarCNPJ(texto)) {
      mostrarMensagem('CNPJ inválido ❌');
      return;
    }
    formatado = texto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  } else {
    mostrarMensagem('Documento inválido ❌');
    return;
  }

  input.value = formatado;
  navigator.clipboard.writeText(formatado);
  mostrarMensagem('Copiado com pontuação ✔');
}

// ── MODAL M.P. ──
function abrirModalMP() {
  const modal = document.getElementById('modal-mp');
  modal.classList.add('active');
}

function fecharModalMP() {
  const modal = document.getElementById('modal-mp');
  modal.classList.remove('active');
}

function inserirTexto(texto, categoria = null) {
  const caixa = document.getElementById("anotacoes");
  const posicaoAtual = caixa.selectionStart;
  const valorAtual = caixa.value;
  
  let textoParaInserir;
  
  if (categoria === 'equipamentos') {
    // Para equipamentos ópticos: sempre em nova linha
    textoParaInserir = valorAtual && !valorAtual.endsWith('\n') ? '\n' + texto : texto;
  } else {
    // Para suporte e outras categorias: continua do ponto final
    if (valorAtual.trim() === '') {
      // Se não há texto, insere normalmente
      textoParaInserir = texto;
    } else {
      // Se há texto, adiciona um espaço antes se não terminar com ponto ou espaço
      const ultimoChar = valorAtual.charAt(valorAtual.length - 1);
      if (ultimoChar === '.' || ultimoChar === ' ') {
        textoParaInserir = ' ' + texto;
      } else {
        textoParaInserir = ' ' + texto;
      }
    }
  }
  
  // Insere o texto na posição do cursor
  const novoValor = valorAtual.slice(0, posicaoAtual) + textoParaInserir + valorAtual.slice(caixa.selectionEnd);
  caixa.value = novoValor;
  
  // Posiciona o cursor após o texto inserido
  const novaPosicao = posicaoAtual + textoParaInserir.length;
  caixa.setSelectionRange(novaPosicao, novaPosicao);
  caixa.focus();
}

function inserirTextoComTooltip(botao) {
  const texto = botao.getAttribute('data-texto');
  const categoria = botao.getAttribute('data-categoria');
  inserirTexto(texto, categoria);
  
  // Removida a funcionalidade de cópia para a área de transferência conforme solicitado.
  mostrarMensagem('Texto inserido! ✔');
}

// ── Tooltip ──
let tooltipAtual = null;

function criarTooltip(elemento, texto) {
  // Remove tooltip anterior se existir
  if (tooltipAtual) {
    tooltipAtual.remove();
    tooltipAtual = null;
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = texto;
  document.body.appendChild(tooltip);

  const rect = elemento.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Posiciona o tooltip acima do botão
  const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  const top = rect.top - tooltipRect.height - 10;
  
  tooltip.style.left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10)) + 'px';
  tooltip.style.top = Math.max(10, top) + 'px';
  
  // Mostra o tooltip
  setTimeout(() => tooltip.classList.add('show'), 10);
  
  tooltipAtual = tooltip;
}

function removerTooltip() {
  if (tooltipAtual) {
    tooltipAtual.classList.remove('show');
    setTimeout(() => {
      if (tooltipAtual) {
        tooltipAtual.remove();
        tooltipAtual = null;
      }
    }, 200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
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
  document.getElementById("btn-transferir")?.addEventListener("click", transferir);
  document.getElementById("btn-limpar")?.addEventListener("click", limparDoc);
  document.getElementById("btn-validar")?.addEventListener("click", validarDoc);
  document.getElementById("btn-titular")?.addEventListener("click", titular);

  // 💡 Tema claro/escuro
  document.getElementById("btn-tema")?.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
  });

  // 🔁 Alternância entre Faster e Desk
  document.getElementById("btn-faster-desk")?.addEventListener("click", () => {
    modoDesk = !modoDesk;
    const textoBotao = modoDesk ? "Desk" : "Faster";
    document.getElementById("btn-faster-desk").textContent = textoBotao;
  });

  // 🟣 Modal M.P.
  document.getElementById("btn-mp")?.addEventListener("click", abrirModalMP);

  // Fechar modal ao clicar no overlay (fora do conteúdo)
  document.getElementById("modal-mp")?.addEventListener("click", (e) => {
    if (e.target.classList.contains('modal-overlay')) {
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
  document.addEventListener('mouseover', (e) => {
    if (e.target.matches('.categoria button[data-texto]')) {
      const texto = e.target.getAttribute('data-texto');
      criarTooltip(e.target, texto);
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.matches('.categoria button[data-texto]')) {
      removerTooltip();
    }
  });
});

function titular() {
  const inputNome = document.getElementById("cliente-nome");
  inputNome.value = "Titular";
}

function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem-copiado");
  msg.textContent = texto;
  setTimeout(() => { msg.textContent = ""; }, 3000);
}

// ── MODAL FATURA ──
function abrirModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.add("active");
}

function fecharModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.remove("active");
}

function copiarFaturas() {
  let textoFaturas = "Olá! Consta em seu cadastro as seguintes faturas em aberto:\n\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha, index) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");
    const linkInput = linha.querySelector(".fatura-link");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();
    const link = linkInput.value.trim();

    if (data || valor || link) {
      faturasEncontradas++;
      textoFaturas += `🔹 Fatura ${faturasEncontradas}:\n`;
      if (data) {
        textoFaturas += `📅 Vencimento: ${data}\n`;
      }
      if (valor) {
        textoFaturas += `💰 Valor: ${valor}\n`;
      }
      if (link) {
        textoFaturas += `🔗 Boleto: ${link}\n`;
      }
      textoFaturas += "\n";
    }
  });

  if (faturasEncontradas > 0) {
    textoFaturas += "Por favor, verifique os dados e nos avise caso já tenha efetuado o pagamento. Estamos à disposição para qualquer dúvida.";
    copiarTexto(textoFaturas);
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

function transferirFaturasParaRegistro() {
  let textoRegistro = "<hr> <b> Pendências em atraso:</b>\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();

    if (data || valor) {
      faturasEncontradas++;
            textoRegistro += `${data} / R$${valor}\n`;
    }
  });

  if (faturasEncontradas > 0) {
    const caixaAnotacoes = document.getElementById("anotacoes");
    caixaAnotacoes.value += textoRegistro;
    mostrarMensagem("Faturas transferidas para o registro! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para transferir.");
  }
}





// ── MODAL FATURA ──
function abrirModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.add("active");
}

function fecharModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.remove("active");
}

function copiarFaturas() {
  let textoFaturas = "Olá! Consta em seu cadastro as seguintes faturas em aberto:\n\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha, index) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");
    const linkInput = linha.querySelector(".fatura-link");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();
    const link = linkInput.value.trim();

    if (data || valor || link) {
      faturasEncontradas++;
      textoFaturas += `🔹 Fatura ${faturasEncontradas}:\n`;
      if (data) {
        textoFaturas += `📅 Vencimento: ${data}\n`;
      }
      if (valor) {
        textoFaturas += `💰 Valor: ${valor}\n`;
      }
      if (link) {
        textoFaturas += `🔗 Boleto: ${link}\n`;
      }
      textoFaturas += "\n";
    }
  });

  if (faturasEncontradas > 0) {
    textoFaturas += "Por favor, verifique os dados e nos avise caso já tenha efetuado o pagamento. Estamos à disposição para qualquer dúvida.";
    copiarTexto(textoFaturas);
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

function transferirFaturasParaRegistro() {
  let textoRegistro = "<hr> <b> Pendências em atraso:</b>\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();

    if (data || valor) {
      faturasEncontradas++;
            textoRegistro += `${data} / R$${valor}\n`;
    }
  });

  if (faturasEncontradas > 0) {
    const caixaAnotacoes = document.getElementById("anotacoes");
    caixaAnotacoes.value += textoRegistro;
    mostrarMensagem("Faturas transferidas para o registro! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para transferir.");
  }
}





// ── MODAL FATURA ──
function abrirModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.add("active");
}

function fecharModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.remove("active");
}

function copiarFaturas() {
  let textoFaturas = "Olá! Consta em seu cadastro as seguintes faturas em aberto:\n\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha, index) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");
    const linkInput = linha.querySelector(".fatura-link");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();
    const link = linkInput.value.trim();

    if (data || valor || link) {
      faturasEncontradas++;
      textoFaturas += `🔹 Fatura ${faturasEncontradas}:\n`;
      if (data) {
        textoFaturas += `📅 Vencimento: ${data}\n`;
      }
      if (valor) {
        textoFaturas += `💰 Valor: ${valor}\n`;
      }
      if (link) {
        textoFaturas += `🔗 Boleto: ${link}\n`;
      }
      textoFaturas += "\n";
    }
  });

  if (faturasEncontradas > 0) {
    textoFaturas += "Por favor, verifique os dados e nos avise caso já tenha efetuado o pagamento. Estamos à disposição para qualquer dúvida.";
    copiarTexto(textoFaturas);
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

function transferirFaturasParaRegistro() {
  let textoRegistro = "<hr> <b> Pendências em atraso:</b>\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();

    if (data || valor) {
      faturasEncontradas++;
            textoRegistro += `${data} / R$${valor}\n`;
    }
  });

  if (faturasEncontradas > 0) {
    const caixaAnotacoes = document.getElementById("anotacoes");
    caixaAnotacoes.value += textoRegistro;
    mostrarMensagem("Faturas transferidas para o registro! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para transferir.");
  }
}





// ── MODAL FATURA ──
function abrirModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.add("active");
}

function fecharModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.remove("active");
}

function copiarFaturas() {
  let textoFaturas = "Olá! Consta em seu cadastro as seguintes faturas em aberto:\n\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha, index) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");
    const linkInput = linha.querySelector(".fatura-link");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();
    const link = linkInput.value.trim();

    if (data || valor || link) {
      faturasEncontradas++;
      textoFaturas += `🔹 Fatura ${faturasEncontradas}:\n`;
      if (data) {
        textoFaturas += `📅 Vencimento: ${data}\n`;
      }
      if (valor) {
        textoFaturas += `💰 Valor: ${valor}\n`;
      }
      if (link) {
        textoFaturas += `🔗 Boleto: ${link}\n`;
      }
      textoFaturas += "\n";
    }
  });

  if (faturasEncontradas > 0) {
    textoFaturas += "Por favor, verifique os dados e nos avise caso já tenha efetuado o pagamento. Estamos à disposição para qualquer dúvida.";
    copiarTexto(textoFaturas);
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

function transferirFaturasParaRegistro() {
  let textoRegistro = "<hr> <b> Pendências em atraso:</b>\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();

    if (data || valor) {
      faturasEncontradas++;
            textoRegistro += `${data} / R$${valor}\n`;
    }
  });

  if (faturasEncontradas > 0) {
    const caixaAnotacoes = document.getElementById("anotacoes");
    caixaAnotacoes.value += textoRegistro;
    mostrarMensagem("Faturas transferidas para o registro! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para transferir.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
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
});

