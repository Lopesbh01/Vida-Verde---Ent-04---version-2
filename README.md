# 🌱 Vida Verde - Website Institucional

![WCAG 2.1 AA](https://img.shields.io/badge/Acessibilidade-WCAG_2.1_AA-green)
![GitFlow](https://img.shields.io/badge/Versionamento-GitFlow-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

Website institucional da **ONG Vida Verde**, especializada na preservação ambiental de Minas Gerais.

## ✨ Características

### ♿ Acessibilidade Total
- **WCAG 2.1 Nível AA** completamente implementado
- Navegação completa por teclado
- Contraste mínimo de 4.5:1 garantido
- Suporte a leitores de tela
- Múltiplos temas: Claro, Escuro e Alto Contraste

### 🚀 Performance
- Minificação de CSS, JS e HTML
- Compressão avançada de imagens
- Otimização para produção
- Carregamento eficiente

### 🔧 Desenvolvimento
- GitFlow com versionamento semântico
- CI/CD com GitHub Actions
- Testes automatizados de acessibilidade
- Deploy contínuo

## 🛠️ Como Executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/vida-verde.git

# Instale dependências
npm install

# Desenvolvimento
npm run dev

# Build produção
npm run build

deploy

🤝 Contribuição
1. Siga o GitFlow

2. Use commits semânticos

3. Teste acessibilidade

4. Abra Pull Requests documentados

Convenção de Commits
feat: adiciona nova funcionalidade
fix: corrige bug
docs: documentação
style: formatação
refactor: refatoração
test: testes

testes
📄 Licença
MIT License - veja LICENSE para detalhes.

Preservando o patrimônio natural de Minas Gerais desde 2005. 🌍


## 🎯 COMO PROCEDER - PASSO A PASSO

### 1. **Configuração Inicial**
```bash
# Execute no terminal na pasta do projeto
git init
git add .
git commit -m "feat: :tada: implementação inicial completa"
git checkout -b develop

2. Estrutura de Branches (GitFlow)

main (produção)
└── develop (desenvolvimento)
    ├── feature/a11y-enhancements
    ├── feature/performance-optimization
    ├── feature/new-content
    └── hotfix/urgent-fixes

3. Fluxo de Desenvolvimento

1. Para novas features: git checkout -b feature/nome-da-feature
2. Commits semânticos: Use prefixos como feat:, fix:, docs:
3. Pull Requests: Use o template fornecido
4. Releases: Tags semânticas (v1.0.0, v1.1.0)

4. Processo de Deploy

1. Merge para main automaticamente deploya para GitHub Pages
2. Testes de acessibilidade rodam automaticamente
3. Build de produção é gerado automaticamente

# Deploy
npm run deploy
