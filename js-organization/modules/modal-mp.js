import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalMP() {
  document.getElementById('modal-mp').showModal();
}

export function fecharModalMP() {
  document.getElementById('modal-mp').close();
}

function inserirTexto(texto, categoria = null) {
  const caixa = document.getElementById("anotacoes");
  const posicaoAtual = caixa.selectionStart;
  const valorAtual = caixa.value;

  let textoParaInserir;

  if (categoria === 'equipamentos') {
    textoParaInserir = valorAtual && !valorAtual.endsWith('\n') ? '\n' + texto : texto;
  } else {
    if (valorAtual.trim() === '') {
      textoParaInserir = texto;
    } else {
      textoParaInserir = ' ' + texto;
    }
  }

  const novoValor = valorAtual.slice(0, posicaoAtual) + textoParaInserir + valorAtual.slice(caixa.selectionEnd);
  caixa.value = novoValor;
  const novaPosicao = posicaoAtual + textoParaInserir.length;
  caixa.setSelectionRange(novaPosicao, novaPosicao);
  caixa.focus();
}

export function inserirTextoComTooltip(botao) {
  const texto = botao.getAttribute('data-texto');
  const categoria = botao.getAttribute('data-categoria');
  inserirTexto(texto, categoria);
  mostrarMensagem('Texto inserido! ✔');
}
