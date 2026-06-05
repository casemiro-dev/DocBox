import { mostrarMensagem } from '../utils/helpers.js';

let _eventosAdicionados = false;

export function abrirModalMulta() {
  document.getElementById("modal-multa").showModal();
  if (!_eventosAdicionados) {
    _eventosAdicionados = true;
    adicionarEventListeners();
  }
}

export function fecharModalMulta() {
  document.getElementById("modal-multa").close();
}

function adicionarEventListeners() {
  const valorPlano = document.getElementById("valor-plano");
  const dataInstalacao = document.getElementById("data-instalacao");
  const dataCancelamento = document.getElementById("data-cancelamento");
  const btnInserirScript = document.getElementById("btn-inserir-script");

  valorPlano.addEventListener("input", calcularMulta);
  dataInstalacao.addEventListener("change", calcularMulta);
  dataCancelamento.addEventListener("change", calcularMulta);
  btnInserirScript.addEventListener("click", inserirNoScript);
}

function estaDentroDos7Dias(dataInicio, dataFim) {
  const diffMs = dataFim.getTime() - dataInicio.getTime();
  const diasCorridos = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  return diasCorridos <= 7;
}

function calcularMesesEntreDatas(dataInicio, dataFim) {
  return Math.max(0, (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 +
    (dataFim.getMonth() - dataInicio.getMonth()));
}

function formatarData(data) {
  return data.toLocaleDateString('pt-BR');
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function exibirDetalhesMulta(dados) {
  const bloco = document.querySelector('.bloco-texto');
  if (!bloco) return;
  let html = `<strong>Detalhes da multa:</strong>
    <div style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
      <p><strong>Instalação/Mud. Plan. em:</strong> ${dados.dataInstalacao}.</p>
      <p><strong>Interesse no cancelamento em:</strong> ${dados.dataCancelamento}.</p>`;

  if (dados.valorMulta === 0 && dados.valorProporcional === 0) {
    html += `<p><strong>Cancelamento dentro dos 7 dias após instalação.</strong></p>
      <p>De acordo com o Art. 49 do CDC, o cliente está isento de qualquer cobrança.</p>`;
  } else {
    html += `
      <p><strong>Meses utilizados:</strong> ${dados.mesesUtilizados}.</p>
      <p><strong>Meses restantes:</strong> ${dados.mesesRestantes}.</p>
      <p><strong>Valor atual do plano:</strong> ${formatarMoeda(dados.valorPlano)}.</p>
      <p><strong>Valor estimado da multa:</strong> (12-${dados.mesesUtilizados})×(${formatarMoeda(dados.valorPlano)})×30% = ${formatarMoeda(dados.valorMulta)}.</p>
      <p><strong>Valor proporcional mensalidade:</strong> (${formatarMoeda(dados.valorPlano)}×${dados.diaAtual})/${dados.diasNoMes} = ${formatarMoeda(dados.valorProporcional)}.</p>`;
  }

  html += `</div>`;
  bloco.innerHTML = html;
}

function limparDetalhesMulta() {
  const bloco = document.querySelector('.bloco-texto');
  if (bloco) bloco.innerHTML = '<strong>Detalhes da multa:</strong>';
}

function calcularMulta() {
  const valorPlano = parseFloat(document.getElementById("valor-plano").value);
  const dataInstalacao = document.getElementById("data-instalacao").value;
  const dataCancelamento = document.getElementById("data-cancelamento").value;

  if (!valorPlano || !dataInstalacao || !dataCancelamento) {
    limparDetalhesMulta();
    return;
  }

  const [anoInst, mesInst, diaInst] = dataInstalacao.split("-").map(Number);
  const dataInicio = new Date(anoInst, mesInst - 1, diaInst);
  const [anoFim, mesFim, diaFim] = dataCancelamento.split("-").map(Number);
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);

  if (estaDentroDos7Dias(dataInicio, dataFim)) {
    exibirDetalhesMulta({
      dataInstalacao: formatarData(dataInicio),
      dataCancelamento: formatarData(dataFim),
      mesesUtilizados: 0, mesesRestantes: 0, valorPlano,
      valorMulta: 0, valorProporcional: 0,
      diaAtual: dataFim.getDate(),
      diasNoMes: new Date(dataFim.getFullYear(), dataFim.getMonth() + 1, 0).getDate()
    });
    return;
  }

  const mesesUtilizados = calcularMesesEntreDatas(dataInicio, dataFim);
  const mesesRestantes = Math.max(0, 12 - mesesUtilizados);
  const valorMulta = mesesRestantes * valorPlano * 0.30;
  const diaAtual = dataFim.getDate();
  const diasNoMes = new Date(dataFim.getFullYear(), dataFim.getMonth() + 1, 0).getDate();
  const valorProporcional = (valorPlano * diaAtual) / diasNoMes;

  exibirDetalhesMulta({
    dataInstalacao: formatarData(dataInicio),
    dataCancelamento: formatarData(dataFim),
    mesesUtilizados, mesesRestantes, valorPlano, valorMulta,
    valorProporcional, diaAtual, diasNoMes
  });
}

function inserirNoScript() {
  const valorPlano = parseFloat(document.getElementById("valor-plano").value);
  const dataInstalacao = document.getElementById("data-instalacao").value;
  const dataCancelamento = document.getElementById("data-cancelamento").value;

  if (!valorPlano || !dataInstalacao || !dataCancelamento) {
    alert("Por favor, preencha todos os campos antes de inserir no script.");
    return;
  }

  const [anoInst, mesInst, diaInst] = dataInstalacao.split("-").map(Number);
  const dataInicio = new Date(anoInst, mesInst - 1, diaInst);
  const [anoFim, mesFim, diaFim] = dataCancelamento.split("-").map(Number);
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);

  let textoScript = "";

  if (estaDentroDos7Dias(dataInicio, dataFim)) {
    textoScript = `<hr><b>Repassado as informações sobre a multa por quebra de contrato.</b>
Instalação/Mud. Plan. em: ${formatarData(dataInicio)}.
Interesse no cancelamento em: ${formatarData(dataFim)}.
Cancelamento solicitado dentro dos 7 dias após instalação.
De acordo com o Art. 49 do Código de Defesa do Consumidor, o cliente está isento de qualquer cobrança (multa, proporcional ou taxa de instalação).`;
  } else {
    const mesesUtilizados = calcularMesesEntreDatas(dataInicio, dataFim);
    const mesesRestantes = Math.max(0, 12 - mesesUtilizados);
    const valorMulta = mesesRestantes * valorPlano * 0.30;
    const diaAtual = dataFim.getDate();
    const diasNoMes = new Date(dataFim.getFullYear(), dataFim.getMonth() + 1, 0).getDate();
    const valorProporcional = (valorPlano * diaAtual) / diasNoMes;

    textoScript = `<hr><b>Repassado as informações sobre a multa por quebra de contrato.</b>
Instalação/Mud. Plan. em: ${formatarData(dataInicio)}.
Interesse no cancelamento em: ${formatarData(dataFim)}.
Meses utilizados: ${mesesUtilizados}.
Meses restantes: ${mesesRestantes}.
Valor atual do plano: ${formatarMoeda(valorPlano)}.
Valor estimado da multa: (12-${mesesUtilizados})×(${formatarMoeda(valorPlano)})×30% = ${formatarMoeda(valorMulta)}.
Valor proporcional mensalidade: (${formatarMoeda(valorPlano)}×${diaAtual})/${diasNoMes} = ${formatarMoeda(valorProporcional)}.`;
  }

  const anotacoes = document.getElementById("anotacoes");
  if (anotacoes) {
    anotacoes.value += textoScript;
    fecharModalMulta();
    mostrarMensagem("Informações da multa inseridas no registro!");
  }
}
