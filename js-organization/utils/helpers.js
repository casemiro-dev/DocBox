export function formatarTelefone(numero) {
  // Remove tudo que não for número
  let numeros = numero.replace(/\D/g, '');

  // Remove DDI 55 se estiver presente
  if (numeros.startsWith('55')) {
    numeros = numeros.slice(2);
  }

  // Se tiver mais de 11 dígitos, pega os últimos 11
  if (numeros.length > 11) {
    numeros = numeros.slice(-11);
  }

  // Formata para (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  // Se não for válido, retorna vazio
  return '';
}

export function addToTextArea(tagHtml) {
  const caixa = document.getElementById("anotacoes");
  caixa.value += tagHtml;
}

export function copiarTexto(texto) {
  const temp = document.createElement("textarea");
  temp.value = texto;
  document.body.appendChild(temp);
  temp.select();
  navigator.clipboard.writeText(texto);
  document.body.removeChild(temp);

  mostrarMensagem("Copiado! Verifique antes de colar as informações no ADM!");
}

export function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem-copiado");
  msg.textContent = texto;
  setTimeout(() => { msg.textContent = ""; }, 3000);
}

export function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function formatarTurno(turno) {
  switch (turno.toLowerCase()) {
    case "manha": return "Manhã";
    case "tarde": return "Tarde";
    case "noite": return "Noite";
    default: return turno;
  }
}

