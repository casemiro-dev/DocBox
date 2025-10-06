import { formatarTelefone, copiarTexto, formatarData, formatarTurno } from '../utils/helpers.js';
import { mostrarMensagem } from '../utils/helpers.js';

let modoDesk = false;

export function copiarProtocolo() {
  const anotacoes = document.getElementById("anotacoes").value.trim();
  const protocoloChat = document.getElementById("chat-protocolo").value.trim();
  const empresarial = document.querySelectorAll(".checkboxes input")[2].checked;

  const pontoFinal = anotacoes.indexOf(".");
  const textoInicial = pontoFinal !== -1 ? anotacoes.slice(0, pontoFinal + 1) : anotacoes;

  let resultado = `${textoInicial}<hr>`;

  if (protocoloChat !== "") {
    resultado += `<b><span style="color: blue;"> Protocolo do Chat: ${protocoloChat} </font></b><hr>`;
  }

  if (empresarial) {
    resultado += `<b>EMPRESA</b><hr>`;
  }

  copiarTexto(resultado);
}

export function copiarAtendimento() {
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

export function toggleModoDesk() {
  modoDesk = !modoDesk;
  const textoBotao = modoDesk ? "Desk" : "Faster";
  document.getElementById("btn-faster-desk").textContent = textoBotao;
}