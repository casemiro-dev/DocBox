import { mostrarMensagem } from '../utils/helpers.js';

export function abrirModalFatura() {
  document.getElementById("modal-fatura").showModal();
}

export function fecharModalFatura() {
  document.getElementById("modal-fatura").close();
}

export function copiarFaturas() {
  let texto = "Olá! Consta em seu cadastro as seguintes faturas em aberto:\n\n";
  let encontradas = 0;

  document.querySelectorAll(".fatura-linha").forEach((linha, i) => {
    const data = linha.querySelector(".fatura-data")?.value.trim();
    const valor = linha.querySelector(".fatura-valor")?.value.trim();
    const link = linha.querySelector(".fatura-link")?.value.trim();

    if (data || valor || link) {
      encontradas++;
      texto += `🔹 Fatura ${encontradas}:\n`;
      if (data) texto += `📅 Vencimento: ${data}\n`;
      if (valor) texto += `💰 Valor: R$${valor}\n`;
      if (link) texto += `🔗 Link: ${link}\n`;
      texto += `\n`;
    }
  });

  if (encontradas > 0) {
    navigator.clipboard.writeText(texto);
    mostrarMensagem("Faturas copiadas! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para copiar.");
  }
}

export function transferirFaturasParaRegistro() {
  let texto = "<hr><b>Repassado ao cliente sobre as pendências:</b>\n";
  let encontradas = 0;

  document.querySelectorAll(".fatura-linha").forEach((linha) => {
    const data = linha.querySelector(".fatura-data")?.value.trim();
    const valor = linha.querySelector(".fatura-valor")?.value.trim();

    if (data || valor) {
      encontradas++;
      texto += `- Valor: R$${valor} | Vencimento: ${data}\n`;
    }
  });

  if (encontradas > 0) {
    const caixa = document.getElementById("anotacoes");
    if (caixa) caixa.value += texto;
    mostrarMensagem("Faturas transferidas para o registro! ✔");
  } else {
    mostrarMensagem("Nenhuma fatura preenchida para transferir.");
  }
}
