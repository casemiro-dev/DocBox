let tooltipAtual = null;

export function criarTooltip(elemento, texto) {
  // Remove tooltip anterior se existir
  if (tooltipAtual) {
    tooltipAtual.remove();
    tooltipAtual = null;
  }

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = texto;
  document.body.appendChild(tooltip);

  const rect = elemento.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Posiciona o tooltip acima do botão
  const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  const top = rect.top - tooltipRect.height - 10;
  
  tooltip.style.left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10)) + "px";
  tooltip.style.top = Math.max(10, top) + "px";
  
  // Mostra o tooltip
  setTimeout(() => tooltip.classList.add("show"), 10);
  
  tooltipAtual = tooltip;
}

export function removerTooltip() {
  if (tooltipAtual) {
    tooltipAtual.classList.remove("show");
    setTimeout(() => {
      if (tooltipAtual) {
        tooltipAtual.remove();
        tooltipAtual = null;
      }
    }, 200);
  }
}

