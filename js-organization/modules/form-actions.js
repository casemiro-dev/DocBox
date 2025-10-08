// ===================================================================================
// ARQUIVO DE AÇÕES DO FORMULÁRIO
// Contém a lógica para os botões de apagar, transferir e titular.
// ===================================================================================

// CORREÇÃO: Importa a nova função 'atualizarTituloPagina' do helpers.js
import { formatarTelefone, mostrarMensagem, atualizarTituloPagina } from '../utils/helpers.js';

/**
 * Limpa todos os campos do formulário e desmarca as checkboxes.
 */
export function apagar() {
  // Limpa todos os campos de entrada principais
  [
    "chat-protocolo", "prot-gerado", "prot-ref-adm", "cliente-nome",
    "telefone", "doc-id", "anotacoes", "periodo-agendamento",
    "data1", "data2", "data3", "disponibilidade", "referencia"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Desmarca todas as checkboxes
  document.querySelectorAll(".checkboxes input[type='checkbox']").forEach(checkbox => {
    checkbox.checked = false;
  });

  // CORREÇÃO: Atualiza o título da página para o padrão
  atualizarTituloPagina();
  
  mostrarMensagem("Campos limpos!", "#4c5270");
}

/**
 * Lê dados da área de transferência e preenche os campos do formulário.
 */
export function transferir() {
  navigator.clipboard.readText()
    .then(texto => {
      // Extrai dados da área de transferência usando expressões regulares
      const protocoloMatch = texto.match(/Número de protocolo:\s*(\d{8,})/);
      const protocolo = protocoloMatch ? protocoloMatch[1] : "";

      const nomeMatch = texto.match(/Nome:\s*([\s\S]*?)(?=Telefone:)/);
      const nome = nomeMatch ? nomeMatch[1].trim() : "";

      const telMatch = texto.match(/Telefone:\s*(\d+)/);
      let telefone = telMatch ? formatarTelefone(telMatch[1]) : "";

      const cpfMatch = texto.match(/CPF\s*Cliente:\s*([\d.-]+)/i);
      const cpfRaw = cpfMatch ? cpfMatch[1].replace(/\D/g, "") : "";

      // Preenche os campos do formulário com os dados extraídos
      document.getElementById("chat-protocolo").value = protocolo;
      document.getElementById("cliente-nome").value = nome;
      document.getElementById("telefone").value = telefone;
      document.getElementById("doc-id").value = cpfRaw;

      // CORREÇÃO: Chama a função para mudar o título da página após preencher o nome
      atualizarTituloPagina();

      mostrarMensagem("Dados transferidos com sucesso!");
    })
    .catch(err => {
      console.error("Erro ao ler a área de transferência:", err);
      mostrarMensagem("Falha ao ler dados. Verifique as permissões.", "#ff0019ff");
    });
}

/**
 * Preenche o campo de nome com a palavra "Titular".
 */
export function titular() {
  const inputNome = document.getElementById("cliente-nome");
  if (inputNome) {
    inputNome.value = "Titular";
  }

  // CORREÇÃO: Garante que o título mude para "Titular"
  atualizarTituloPagina();
}
