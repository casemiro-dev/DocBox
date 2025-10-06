import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.add("active");
}

export function fecharModalFatura() {
  const modal = document.getElementById("modal-fatura");
  modal.classList.remove("active");
}

export function copiarFaturas() {
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
        textoFaturas += `💰 Valor: R$${valor}\n`;
      }
      if (link) {
        textoFaturas += `🔗 Link: ${link}\n`;
      }
      textoFaturas += `\n`;
    }
  });

  if (faturasEncontradas > 0) {
    const temp = document.createElement("textarea");
    temp.value = textoFaturas;
    document.body.appendChild(temp);
    temp.select();
    navigator.clipboard.writeText(textoFaturas);
    document.body.removeChild(temp);
    mostrarMensagem("Faturas copiadas! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

export function transferirFaturasParaRegistro() {
  let textoRegistro = "<hr><b>Repassado ao cliente sobre as pendências:</b>\n";
  let faturasEncontradas = 0;

  const linhasFatura = document.querySelectorAll(".fatura-linha");
  linhasFatura.forEach((linha) => {
    const dataInput = linha.querySelector(".fatura-data");
    const valorInput = linha.querySelector(".fatura-valor");

    const data = dataInput.value.trim();
    const valor = valorInput.value.trim();

    if (data || valor) {
      faturasEncontradas++;
      textoRegistro += `- Valor: R$${valor} | Vencimento: ${data}\n`;
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