import { formatarTelefone, mostrarMensagem } from '../utils/helpers.js';

export function apagar() {
  // Campos principais
  document.getElementById("chat-protocolo").value = "";
  document.getElementById("prot-gerado").value = "";
  document.getElementById("prot-ref-adm").value = "";
  document.getElementById("cliente-nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("doc-id").value = "";
  document.getElementById("anotacoes").value = "";
  document.getElementById("mensagem-copiado").textContent = "";

  // Campos de agendamento
  document.getElementById("periodo-agendamento").value = "";
  document.getElementById("data1").value = "";
  document.getElementById("data2").value = "";
  document.getElementById("data3").value = "";
  document.getElementById("disponibilidade").value = "";
  document.getElementById("referencia").value = "";

  // Checkboxes
  const checkboxes = document.querySelectorAll(".checkboxes input");
  checkboxes.forEach(checkbox => checkbox.checked = false);
}

export function transferir() {
  navigator.clipboard.readText()
    .then(texto => {
      const protocoloMatch = texto.match(/Número de protocolo:\s*(\d{8,})/);
      const protocolo = protocoloMatch ? protocoloMatch[1] : "";

      const nomeMatch = texto.match(/Nome:\s*([\s\S]*?)(?=Telefone:)/);
      const nome = nomeMatch ? nomeMatch[1].trim() : "";

      const telMatch = texto.match(/Telefone:\s*(\d+)/);
      let telefone = "";
      if (telMatch) {
        let nums = telMatch[1];
        if (nums.length > 11) {
          nums = nums.slice(-11);
        }
        telefone = formatarTelefone(nums);
      }

      const cpfMatch = texto.match(/CPF\s*Cliente:\s*([\d\.\-]+)/i);
      let cpfRaw = cpfMatch ? cpfMatch[1] : "";
      cpfRaw = cpfRaw.replace(/\D/g, "");

      document.getElementById("chat-protocolo").value = protocolo;
      document.getElementById("cliente-nome").value = nome;
      document.getElementById("telefone").value = telefone;
      document.getElementById("doc-id").value = cpfRaw;

      mostrarMensagem("Dados transferidos com sucesso!");
    })
    .catch(err => {
      console.error("Erro ao ler a área de transferência:", err);
    });
}

export function titular() {
  const inputNome = document.getElementById("cliente-nome");
  inputNome.value = "Titular";
}

