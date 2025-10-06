import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalMP() {
  const modal = document.getElementById('modal-mp');
  modal.classList.add('active');
}

export function fecharModalMP() {
  const modal = document.getElementById('modal-mp');
  modal.classList.remove('active');
}

export function inserirTexto(texto, categoria = null) {
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

export function inserirTextoComTooltip(botao) {
  const texto = botao.getAttribute('data-texto');
  const categoria = botao.getAttribute('data-categoria');
  inserirTexto(texto, categoria);
  
  // Removida a funcionalidade de cópia para a área de transferência conforme solicitado.
  mostrarMensagem('Texto inserido! ✔');
}

