import { formatarTelefone, mostrarMensagem } from '../utils/helpers.js';

export function apagar() {
  // Campos principais
  [
    "chat-protocolo",
    "prot-gerado",
    "prot-ref-adm",
    "cliente-nome",
    "telefone",
    "doc-id",
    "anotacoes",
    "periodo-agendamento",
    "data1",
    "data2",
    "data3",
    "disponibilidade",
    "referencia"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Checkboxes da seção de agendamento
  document.querySelectorAll(".checkboxes input[type='checkbox']").forEach(checkbox => {
    checkbox.checked = false;
  });
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

