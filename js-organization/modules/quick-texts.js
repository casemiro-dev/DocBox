import { salvarEstado } from '../utils/auto-save.js';
import { mostrarMensagem } from '../utils/helpers.js';

const STORAGE_KEY = 'docbox_quick_texts_custom';

const TEXTOS_FIXOS = [
  { id: 'fatura-chat', label: 'Fatura chat', text: 'Encaminhado segunda via da fatura via chat em pdf. Cliente orientado.', categoria: 'sac' },
  { id: 'fatura-tel', label: 'Fatura tel', text: 'Encaminhado segunda via da fatura via e-mail. Cliente orientado.', categoria: 'sac' },
  { id: 'procedimentos', label: 'Procedimentos', text: 'Realizado o reboot mais reinicio manual dos equipamentos.', categoria: 'suporte' },
  { id: 'nao-normalizado', label: 'Não normalizado', text: 'Conexão não normalizada. Aberto O.S.', categoria: 'suporte' },
  { id: 'normalizado', label: 'Normalizado', text: 'Conexão normalizada. Sem mais.', categoria: 'suporte' },
  { id: 'transf-endereco', label: 'Transf. endereço', text: 'Solicita mudança de endereço. Aberto O.S.\n\nNovo endereço:', categoria: 'sac' },
  { id: 'mud-plano', label: 'Mud. Plano', text: 'Plano alterado para XX Mega R$XX Por X meses. Após, R$XX. Renovar a fidelidade por mais 12 meses.', categoria: 'sac' },
  { id: 'mud-ponto', label: 'Mud. Ponto', text: 'Solicita mudança de ponto intero/externo. Aberto O.S.', categoria: 'sac' },
  { id: 'massivo', label: 'Massivo', text: 'Identificado problema massivo. Enviado o formulário e informado o prazo de normalização. Cliente orientado aguardar.', categoria: 'suporte' },
  { id: 'orientado-visita', label: 'Orientado visita', text: 'Cliente orientado sobre o dia e horário da visita. Sem mais.', categoria: 'suporte' },
  { id: 'cancelamento', label: 'Cancelamento', text: '► Motivo:\n► Ofertado:\n► Sem Sucesso nas ofertas.\n► Transferido para a retenção.', categoria: 'sac' },
  { id: 'dados-vs', label: 'Dados da VS', text: '- Endereço da manutenção:\n- Ponto de referência:\n- Telefone para contato:\n- E-mail atualizado:\n- Antecipação da visita, se for possível: [ ] Sim, [ ] Não.\n- Se sim, qual o período e horário desejado?:', categoria: 'suporte' },
];

let editandoId = null;

function gerarId() {
  return 'custom_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
}

function carregarCustomizados() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function salvarCustomizados(textos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(textos));
}

function inserirTexto(texto) {
  const ta = document.getElementById('anotacoes');
  if (!ta) return;
  const existing = ta.value.trim();
  ta.value = existing ? existing + '\n\n' + texto : texto;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  salvarEstado();
  ta.focus();
  const cursorPos = ta.value.length;
  try { ta.setSelectionRange(cursorPos, cursorPos); } catch {}
  mostrarMensagem('Texto inserido!');
}

function mostrarVisao(id) {
  document.getElementById('qt-atalhos-view').style.display = id === 'atalhos' ? '' : 'none';
  document.getElementById('qt-editor-view').style.display = id === 'editor' ? '' : 'none';
}

function renderizarCategorias() {
  const container = document.getElementById('qt-categories-container');
  if (!container) return;
  const customizados = carregarCustomizados();
  container.innerHTML = '';

  const suporte = TEXTOS_FIXOS.filter(t => t.categoria === 'suporte');
  const sac = TEXTOS_FIXOS.filter(t => t.categoria === 'sac');

  container.appendChild(criarGrupoCategoria('Suporte', suporte));
  container.appendChild(criarGrupoCategoria('SAC', sac));

  if (customizados.length > 0) {
    container.appendChild(criarGrupoCategoria('Customizados', customizados));
  }
}

function criarGrupoCategoria(nome, itens) {
  const div = document.createElement('div');

  const title = document.createElement('div');
  title.className = 'qt-category-title';
  title.textContent = nome;
  div.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'qt-category-grid';

  for (const t of itens) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qt-category-btn';
    btn.textContent = t.label;
    btn.title = t.text;
    btn.addEventListener('click', () => inserirTexto(t.text));
    grid.appendChild(btn);
  }

  div.appendChild(grid);
  return div;
}

function abrirAtalhos() {
  const modal = document.getElementById('quick-texts-modal');
  if (!modal) return;
  document.getElementById('qt-modal-title').textContent = 'Atalhos';
  mostrarVisao('atalhos');
  renderizarCategorias();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  const modal = document.getElementById('quick-texts-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  editandoId = null;
}

function abrirEditor() {
  document.getElementById('qt-modal-title').textContent = 'Gerenciar Textos';
  mostrarVisao('editor');
  editandoId = null;
  renderizarListaEditor();
  resetarFormEditor();
}

function voltarParaAtalhos() {
  document.getElementById('qt-modal-title').textContent = 'Atalhos';
  mostrarVisao('atalhos');
  renderizarCategorias();
  editandoId = null;
}

function renderizarListaEditor() {
  const container = document.getElementById('quick-texts-list');
  if (!container) return;
  const customizados = carregarCustomizados();
  container.innerHTML = '';

  for (const t of TEXTOS_FIXOS) {
    container.appendChild(criarItemEditor(t, true));
  }

  if (customizados.length > 0) {
    const separator = document.createElement('div');
    separator.className = 'qt-separator';
    separator.textContent = '— Customizados —';
    container.appendChild(separator);
    for (const t of customizados) {
      container.appendChild(criarItemEditor(t, false));
    }
  }
}

function criarItemEditor(t, isFixo) {
  const div = document.createElement('div');
  div.className = 'qt-list-item';
  div.id = 'qt-item-' + t.id;

  const info = document.createElement('div');
  info.className = 'qt-info';

  const label = document.createElement('div');
  label.className = 'qt-label';
  label.textContent = t.label;

  const preview = document.createElement('div');
  preview.className = 'qt-preview';
  preview.textContent = t.text.replace(/\n/g, ' ↵ ');

  info.appendChild(label);
  info.appendChild(preview);
  div.appendChild(info);

  const actions = document.createElement('div');
  actions.className = 'qt-actions';

  if (isFixo) {
    const badge = document.createElement('span');
    badge.className = 'qt-badge';
    badge.textContent = 'Padrão';
    actions.appendChild(badge);
  } else {
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'qt-btn-sm';
    btnEdit.innerHTML = '<i class="fas fa-pen"></i>';
    btnEdit.title = 'Editar';
    btnEdit.addEventListener('click', () => iniciarEdicaoEditor(t.id));
    actions.appendChild(btnEdit);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.className = 'qt-btn-sm danger';
    btnDel.innerHTML = '<i class="fas fa-trash"></i>';
    btnDel.title = 'Remover';
    btnDel.addEventListener('click', () => deletarTextoEditor(t.id));
    actions.appendChild(btnDel);
  }

  div.appendChild(actions);
  return div;
}

function resetarFormEditor() {
  editandoId = null;
  const inputLabel = document.getElementById('qt-label');
  const inputText = document.getElementById('qt-text');
  const formTitle = document.getElementById('qt-form-title');
  const btnSalvar = document.getElementById('btn-salvar-qt');
  const btnCancelar = document.getElementById('btn-cancelar-edit');
  if (inputLabel) inputLabel.value = '';
  if (inputText) inputText.value = '';
  if (formTitle) formTitle.textContent = 'Adicionar novo texto';
  if (btnSalvar) btnSalvar.textContent = 'Adicionar';
  if (btnCancelar) btnCancelar.style.display = 'none';
}

function iniciarEdicaoEditor(id) {
  const customizados = carregarCustomizados();
  const t = customizados.find(item => item.id === id);
  if (!t) return;

  editandoId = id;
  const inputLabel = document.getElementById('qt-label');
  const inputText = document.getElementById('qt-text');
  const formTitle = document.getElementById('qt-form-title');
  const btnSalvar = document.getElementById('btn-salvar-qt');
  const btnCancelar = document.getElementById('btn-cancelar-edit');

  if (inputLabel) inputLabel.value = t.label;
  if (inputText) inputText.value = t.text;
  if (formTitle) formTitle.textContent = 'Editar texto';
  if (btnSalvar) btnSalvar.textContent = 'Salvar';
  if (btnCancelar) btnCancelar.style.display = '';
}

function salvarTextoAtual() {
  const inputLabel = document.getElementById('qt-label');
  const inputText = document.getElementById('qt-text');
  if (!inputLabel || !inputText) return;

  const label = inputLabel.value.trim();
  const text = inputText.value.trim();

  if (!label) {
    mostrarMensagem('Informe um nome para o botão.', '#ef4444');
    inputLabel.focus();
    return;
  }
  if (!text) {
    mostrarMensagem('Informe o conteúdo do texto.', '#ef4444');
    inputText.focus();
    return;
  }

  let customizados = carregarCustomizados();

  if (editandoId) {
    const idx = customizados.findIndex(t => t.id === editandoId);
    if (idx !== -1) {
      customizados[idx] = { ...customizados[idx], label, text };
    }
    mostrarMensagem('Texto atualizado!');
  } else {
    customizados.push({ id: gerarId(), label, text });
    mostrarMensagem('Texto adicionado!');
  }

  salvarCustomizados(customizados);
  renderizarListaEditor();
  resetarFormEditor();
}

function deletarTextoEditor(id) {
  let customizados = carregarCustomizados();
  const idx = customizados.findIndex(t => t.id === id);
  if (idx === -1) return;
  customizados.splice(idx, 1);
  salvarCustomizados(customizados);
  renderizarListaEditor();
  mostrarMensagem('Texto removido!');
}

export function initQuickTexts() {
  document.getElementById('btn-atalhos')?.addEventListener('click', abrirAtalhos);
  document.getElementById('btn-editar-textos')?.addEventListener('click', abrirEditor);
  document.getElementById('btn-fechar-modal')?.addEventListener('click', fecharModal);
  document.getElementById('btn-fechar-atalhos')?.addEventListener('click', fecharModal);
  document.getElementById('btn-voltar-atalhos')?.addEventListener('click', voltarParaAtalhos);
  document.getElementById('btn-salvar-qt')?.addEventListener('click', salvarTextoAtual);
  document.getElementById('btn-cancelar-edit')?.addEventListener('click', resetarFormEditor);

  const modal = document.getElementById('quick-texts-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}
