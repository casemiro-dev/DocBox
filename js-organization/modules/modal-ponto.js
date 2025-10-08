// ===================================================================================
// MÓDULO: MODAL PONTO ADICIONAL
// Lógica adaptada para o HTML fornecido pelo usuário.
// ===================================================================================

import { addToTextArea } from '../utils/helpers.js';

// --- FUNÇÕES DE CONTROLE DO MODAL ---

/**
 * Abre o modal de Ponto Adicional.
 */
export function abrirModalPontoAdicional() {
  const modal = document.getElementById("modal-ponto-adicional");
  if (modal) {
    modal.classList.add("active");
  }
}

/**
 * Fecha o modal de Ponto Adicional.
 */
export function fecharModalPontoAdicional() {
  const modal = document.getElementById("modal-ponto-adicional");
  if (modal) {
    modal.classList.remove("active");
  }
}

// --- FUNÇÕES DE CÁLCULO E LÓGICA ---

/**
 * Retorna o valor da mensalidade com base no número de pontos.
 * @param {number} numPontos - O número de pontos adicionais (1 a 5).
 * @returns {number} - O valor da mensalidade.
 */
function getValorMensalidade(numPontos) {
  const valores = [29.90, 49.90, 69.90, 89.90, 109.90];
  return valores[numPontos - 1] || 0;
}

/**
 * Retorna a string no plural ou singular.
 * @param {number} numPontos - O número de pontos.
 * @returns {string} - "pontos adicionais" ou "ponto adicional".
 */
function getTextoPlural(numPontos) {
  return numPontos > 1 ? "pontos adicionais" : "ponto adicional";
}

/**
 * Formata um número para o padrão monetário brasileiro (ex: 109.9 -> "109,90").
 * @param {number} valor - O valor a ser formatado.
 * @returns {string} - O valor formatado como string.
 */
function formatarParaReal(valor) {
    return valor.toFixed(2).replace('.', ',');
}

/**
 * Calcula os custos do ponto adicional, gera o script e o insere no registro.
 */
function calcularEInserirPontoAdicional() {
  // 1. Obter valores dos inputs do seu HTML
  const numPontos = parseInt(document.getElementById("pontos-adicionais")?.value, 10);
  const velocidadePlano = document.getElementById("plano-velocidade")?.value;
  const tipoPlano = document.getElementById("plan-tipo")?.value;
  // O seu input é 'number', então não precisa de replace de vírgula
  const valorPlanoAtual = parseFloat(document.getElementById("valor-plano-adc")?.value) || 0;

  // 2. Validação
  if (!numPontos || !velocidadePlano || valorPlanoAtual <= 0) {
    alert("Por favor, preencha todos os campos do modal de Ponto Adicional antes de inserir.");
    return;
  }

  // 3. Realizar os cálculos
  const valorMensalidadePonto = getValorMensalidade(numPontos);
  const valorTotalMensalidade = valorPlanoAtual + valorMensalidadePonto;

  // 4. Formatar valores para exibição
  const mensalidadePontoStr = formatarParaReal(valorMensalidadePonto);
  const planoAtualStr = formatarParaReal(valorPlanoAtual);
  const totalStr = formatarParaReal(valorTotalMensalidade);
  const textoPlural = getTextoPlural(numPontos);

  // 5. Gerar o script final
  const script = `Cliente solicitou a instalação de ${numPontos} ${textoPlural} [wi-fi]. Ficou ciente do prazo de até 7 dias para a ocorrência do serviço.\n<hr><b>Valor da mensalidade de ${numPontos} ${textoPlural}:</b> R$${mensalidadePontoStr}.<hr>Cliente possui um plano de ${velocidadePlano} ${tipoPlano}, nesse caso o valor da mensalidade ficará: R$${planoAtualStr} + R$${mensalidadePontoStr} = R$${totalStr}.`;

  // 6. Inserir no campo de anotações e fechar o modal
  addToTextArea(script);
  fecharModalPontoAdicional();
}

// --- REGISTRO DE EVENTOS DO MODAL ---

// Disponibiliza a função no objeto `window` para ser chamada pelo `onclick` no seu HTML
window.calcularPontoAdicional = calcularEInserirPontoAdicional;
// Disponibiliza a função de fechar para o `onclick` do botão 'x'
window.fecharModalPontoAdicional = fecharModalPontoAdicional;
