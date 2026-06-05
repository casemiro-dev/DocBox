import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalPontoAdicional() {
  document.getElementById("modal-ponto-adicional").showModal();
}

export function fecharModalPontoAdicional() {
  document.getElementById("modal-ponto-adicional").close();
}

function getValorMensalidade(numPontos) {
  const valores = [29.90, 49.90, 69.90, 89.90, 109.90];
  return valores[numPontos - 1] || 0;
}

function getTextoPlural(numPontos) {
  return numPontos > 1 ? "pontos adicionais" : "ponto adicional";
}

function formatarParaReal(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function calcularEInserirPontoAdicional() {
  const numPontos = parseInt(document.getElementById("pontos-adicionais")?.value, 10);
  const velocidadePlano = document.getElementById("plano-velocidade")?.value;
  const tipoPlano = document.getElementById("plan-tipo")?.value;
  const valorPlanoAtual = parseFloat(document.getElementById("valor-plano-adc")?.value) || 0;

  if (!numPontos || !velocidadePlano || valorPlanoAtual <= 0) {
    alert("Por favor, preencha todos os campos do modal de Ponto Adicional antes de inserir.");
    return;
  }

  const valorMensalidadePonto = getValorMensalidade(numPontos);
  const valorTotalMensalidade = valorPlanoAtual + valorMensalidadePonto;

  const mensalidadePontoStr = formatarParaReal(valorMensalidadePonto);
  const planoAtualStr = formatarParaReal(valorPlanoAtual);
  const totalStr = formatarParaReal(valorTotalMensalidade);
  const textoPlural = getTextoPlural(numPontos);

  const script = `Cliente solicitou a instalação de ${numPontos} ${textoPlural} [wi-fi]. Ficou ciente do prazo de até 7 dias para a ocorrência do serviço.\n<hr><b>Valor da mensalidade de ${numPontos} ${textoPlural}:</b> R$${mensalidadePontoStr}.<hr>Cliente possui um plano de ${velocidadePlano} ${tipoPlano}, nesse caso o valor da mensalidade ficará: R$${planoAtualStr} + R$${mensalidadePontoStr} = R$${totalStr}.`;

  const caixa = document.getElementById("anotacoes");
  if (caixa) caixa.value += script;

  fecharModalPontoAdicional();
}

window.calcularPontoAdicional = calcularEInserirPontoAdicional;
window.fecharModalPontoAdicional = fecharModalPontoAdicional;
