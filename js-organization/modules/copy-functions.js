import { formatarTelefone, copiarTexto, mostrarMensagem } from '../utils/helpers.js';

export function copiarAtendimento() {
  const protocoloChat = document.getElementById("chat-protocolo")?.value.trim() ?? "";
  const nomeCliente = document.getElementById("cliente-nome")?.value.trim() ?? "";
  const telefoneRaw = document.getElementById("telefone")?.value.trim() ?? "";
  const telefone = formatarTelefone(telefoneRaw);
  const anotacoes = document.getElementById("anotacoes")?.value.trim() ?? "";

  let resultado = "";

  if (protocoloChat) {
    resultado += `Protocolo do chat: ${protocoloChat}\n`;
  }

  resultado += `Cliente ${nomeCliente || "[NOME]"} via ${protocoloChat ? "chat" : "tel"} no nº ${telefone || "[TELEFONE]"}. `;
  resultado += anotacoes || "[sem registro]";

  copiarTexto(resultado);
}
