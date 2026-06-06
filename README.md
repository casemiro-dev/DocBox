<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/status-ativo-brightgreen?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript ES6"/>
  <img src="https://img.shields.io/badge/sem%20build%20steps-✓-6c63ff?style=flat-square" alt="No build steps"/>
  <br/><br/>
</div>

<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=700&size=32&duration=3000&pause=1000&color=6C63FF&center=true&vCenter=true&width=300&lines=DocBox;Registro+Rápido;Copiar+Eficiente" alt="Typing SVG">
</h1>

<p align="center">
  <b>Ferramenta inteligente para registro e cópia de atendimentos</b><br/>
  Interface leve, moderna e sem dependências — criada para otimizar o dia a dia de agentes de call center.
</p>

<br/>

<p align="center">
  <i>"Feito para quem precisa registrar atendimentos com rapidez e precisão."</i>
</p>

<br/>

---

## 🚀 Sobre o Projeto

**DocBox** é uma aplicação web single-page (SPA) construída com JavaScript Vanilla que permite a agentes de atendimento **registrar, validar e copiar** informações de clientes de forma padronizada e ultrarrápida.

Chega de digitar protocolo, nome, CPF e telefone um por um. Com o DocBox você **cola um texto**, clica em **Transferir**, e os campos são preenchidos automaticamente. Depois é só clicar em **Copiar** para levar o atendimento formatado para o sistema administrativo.

---

## ✨ Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| ✅ | **Transferência Inteligente** | Cole um texto da área de transferência e os campos (protocolo, nome, telefone, CPF/CNPJ) são extraídos automaticamente |
| ✅ | **Validação de CPF/CNPJ** | Valida os dígitos verificadores e formata no padrão `XXX.XXX.XXX-XX` ou `XX.XXX.XXX/XXXX-XX` |
| ✅ | **Formatação de Telefone** | Máscara automática no formato `(XX) XXXXX-XXXX` |
| ✅ | **Cópia Formatada** | Monta um texto padronizado do atendimento e copia para a área de transferência com um clique |
| ✅ | **Auto-Save por Aba** | Cada aba do navegador tem seu próprio rascunho salvo automaticamente — sem perder dados ao recarregar |
| ✅ | **Múltiplas Abas** | Abra quantas abas quiser — cada uma mantém seu estado independente |
| ✅ | **Modo Escuro/Claro** | Alternância suave entre temas com persistência |
| ✅ | **Tema Personalizável** | Escolha a cor de destaque e até um background (imagem ou GIF) |
| ✅ | **Zero Dependências** | Abre direto no navegador. Sem npm, sem build, sem servidor |

---

## 🛠️ Tecnologias

<div align="center">

| Tecnologia | Aplicação |
|---|---|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="20" height="20"/> **HTML5** | Estrutura semântica da página |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="20" height="20"/> **CSS3** | Custom properties, Flexbox, animações, design responsivo |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20" height="20"/> **JavaScript ES6** | Módulos, arrow functions, desestruturação, template literals |
| [<img src="https://fonts.gstatic.com/s/i/googlematerialicons/format_size/v6/white-24dp/1x/gm_format_size_white_24dp.png" width="20" height="20"/> Google Fonts](https://fonts.google.com/) | Fonte Inter — tipografia limpa e moderna |
| [<img src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/svgs/solid/cube.svg" width="20" height="20"/> Font Awesome](https://fontawesome.com/) | Ícones vetoriais |
| **localStorage / sessionStorage** | Persistência de dados e identificação de abas |
| **Clipboard API** | Leitura e escrita na área de transferência |

</div>

---

## 📁 Estrutura do Projeto

```
📦 DocBox/
├── 📄 index.html                          ← Página principal
├── 🎨 style.css                           ← Estilos completos (tema escuro/claro)
├── 📝 README.md                           ← Documentação
└── 📂 js-organization/
    ├── 📄 script.js                       ← Orquestrador principal
    ├── 📂 modules/
    │   ├── 📄 copy-functions.js           ← Montagem do texto de cópia
    │   ├── 📄 form-actions.js             ← Ações: Apagar, Transferir, Titular
    │   └── 📄 document-validation.js      ← Validação e formatação de CPF/CNPJ
    └── 📂 utils/
        ├── 📄 helpers.js                  ← Utilitários (telefone, clipboard, toast)
        ├── 📄 auto-save.js                ← Auto-save por aba no localStorage
        └── 📄 validators.js               ← Algoritmos de validação de CPF e CNPJ
```

### 📌 Organização Modular

O código é dividido em **módulos ES6** com responsabilidades bem definidas:

| Módulo | Responsabilidade |
|---|---|
| `script.js` | Inicialização, eventos, temas, sidebar, background |
| `copy-functions.js` | Monta o texto formatado do atendimento |
| `form-actions.js` | Lógica dos botões Transferir, Apagar e Titular |
| `document-validation.js` | Formata/limpa CPF e CNPJ |
| `helpers.js` | Formata telefone, copia texto, exibe mensagens |
| `auto-save.js` | Gerencia rascunhos no localStorage por aba |
| `validators.js` | Valida dígitos verificadores de CPF e CNPJ |

---

## ▶️ Como Usar

### Opção 1 — Abrir direto (recomendado)
Basta abrir o arquivo `index.html` no seu navegador:

```
file:///C:/caminho/para/DocBox/index.html
```

### Opção 2 — Servidor estático (melhor compatibilidade)

**Com Python:**
```bash
cd DocBox
python -m http.server 8000
# Acesse http://localhost:8000
```

**Com Node.js:**
```bash
cd DocBox
npx serve .
# Acesse http://localhost:3000
```

### Fluxo de uso básico

<p align="center">
  <b>1️⃣ Preencha os campos → 2️⃣ Clique em "Copiar" → 3️⃣ Cole no sistema administrativo</b>
</p>

Ou, para mais agilidade:

<p align="center">
  <b>1️⃣ Copie os dados de origem → 2️⃣ Clique em "Transferir" → 3️⃣ Ajuste → 4️⃣ "Copiar"</b>
</p>

---

## 📸 Preview

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Modo Escuro</b></td>
      <td align="center"><b>Modo Claro</b></td>
    </tr>
    <tr>
      <td>
        <img src="https://placehold.co/400x300/0f1117/6c63ff?text=DocBox+Dark&font=inter" alt="Dark Mode" width="350"/>
      </td>
      <td>
        <img src="https://placehold.co/400x300/f8f9fc/6c63ff?text=DocBox+Light&font=inter" alt="Light Mode" width="350"/>
      </td>
    </tr>
  </table>
  <p><i>🖼️ Substitua os placeholders por capturas de tela reais do projeto.</i></p>
</div>

---

## 🧠 Arquitetura

O DocBox foi construído com **JavaScript Vanilla modular**, seguindo boas práticas de separação de responsabilidades:

- **Camada de Utilitários** (`utils/`): funções puras e reutilizáveis (validação, formatação)
- **Camada de Módulos** (`modules/`): lógica de negócio (cópia, ações do formulário)
- **Camada de Orquestração** (`script.js`): inicialização e eventos da UI

Cada aba do navegador recebe um **ID único via `sessionStorage`**, permitindo que múltiplas abas operem de forma independente com auto-save isolado no `localStorage`.

---

## 🔗 Projetos Relacionados

| Projeto | Descrição |
|---|---|
| [🚀 DocBox Pro](https://docbox-pro.vercel.app/) | Versão aprimorada com novos recursos |
| [📋 Painel de Atalhos](https://casemiro-dev.github.io/Painel-de-Scripts/) | Planilha interativa de atalhos para Desktop |
| [🏥 SupPaciente](https://sup-paciente.vercel.app/) | Ferramenta de suporte para atendimento |
| [📊 Garrafão de Conhecimento](https://trello.com/b/1zcmGoxE/garrafao-de-conhecimentos-desktop) | Central de conhecimento no Trello |
| [🔒 LGPD](https://casemiro-dev.github.io/LGPD/) | Política de privacidade |

---

## 👨‍💻 Autor

<div align="center">
  <p>
    <b>Casemiro Alves</b><br/>
    <a href="https://github.com/casemiro-dev">🐙 GitHub</a>
  </p>
  <br/>
  <p>
    <i>"Criado por um agente de atendimento, para agentes de atendimento."</i>
  </p>
</div>

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <br/>
  <p>
    <img src="https://img.shields.io/badge/Feito%20com%20%E2%9D%A4%EF%B8%8F%20por-Casemiro%20Alves-6c63ff?style=flat-square" alt="Feito com amor"/>
  </p>
  <p>
    <sub>© 2025-2026 Casemiro Alves. Todos os direitos reservados.</sub>
  </p>
</div>
