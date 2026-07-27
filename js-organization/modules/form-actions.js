import { formatarTelefone, mostrarMensagem, atualizarTituloPagina } from '../utils/helpers.js';
import { salvarEstado } from '../utils/auto-save.js';

export function apagar() {
  ["chat-protocolo", "cliente-nome", "telefone", "doc-id", "anotacoes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  atualizarTituloPagina();
  mostrarMensagem("Campos limpos!");
}

export function transferir() {
  navigator.clipboard.readText()
    .then(texto => {
      const protocoloMatch = texto.match(/N.mero de protocolo:\s*(\d{8,})/i);
      const protocolo = protocoloMatch ? protocoloMatch[1] : "";

      const nomeMatch = texto.match(/Nome:\s*([\s\S]*?)(?=Telefone:)/);
      const nome = nomeMatch ? nomeMatch[1].trim() : "";

      const telMatch = texto.match(/Telefone:\s*(\d+)/);
      let telefone = telMatch ? formatarTelefone(telMatch[1]) : "";

      const cpfMatch = texto.match(/(?:cpf|cnpj)\s*Cliente:\s*([\d.-]+)|CPF:\s*([\d.-]+)/i);
      let docRaw = "";
      if (cpfMatch) {
        docRaw = (cpfMatch[1] || cpfMatch[2]).replace(/\D/g, "");
        if (docRaw.length === 15 && docRaw.startsWith("0")) docRaw = docRaw.substring(1);
      }

      document.getElementById("chat-protocolo").value = protocolo;
      document.getElementById("cliente-nome").value = nome;
      document.getElementById("telefone").value = telefone;
      document.getElementById("doc-id").value = docRaw;

      atualizarTituloPagina();
      salvarEstado();
      mostrarMensagem("Dados transferidos com sucesso!");
    })
    .catch(() => {
      mostrarMensagem("Falha ao ler dados. Verifique as permissões.", "#ef4444");
    });
}

export function titular() {
  const input = document.getElementById("cliente-nome");
  if (input) input.value = "Titular";
  atualizarTituloPagina();
  salvarEstado();
}
