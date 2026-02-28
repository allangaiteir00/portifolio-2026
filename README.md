# 🚀 Allan Gaiteiro — Portfolio

[![Unit Tests](https://github.com/allangaiteir00/portifolio/actions/workflows/tests.yml/badge.svg)](https://github.com/allangaiteir00/portifolio/actions/workflows/tests.yml)
[![Build and Deploy](https://github.com/allangaiteir00/portifolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/allangaiteir00/portifolio/actions/workflows/deploy.yml)

Este é o meu portfólio profissional, desenvolvido com o que há de mais moderno no ecossistema **Angular**. O projeto foi concebido para demonstrar não apenas minhas habilidades de front-end, mas também rigor técnico em arquitetura, testes e automação.

---

## 🛠️ Stack Tecnológica

O projeto utiliza as tecnologias e padrões mais avançados da indústria:

- **Framework**: [Angular 19+](https://angular.dev/) (Standalone Components & Signals)
- **Estilização**: Sass (Arquitetura moderna com `@use`) & GSAP para animações de alta performance.
- **Integração**: GitHub API para carregamento dinâmico de projetos reais.
- **Build Tool**: Vite (via AnalogJS/Angular CLI) para HMR instantâneo.
- **Qualidade**: 100% de cobertura de testes unitários.

---

## 🏗️ Arquitetura e Padrões de Projeto

O codebase segue rigorosamente os princípios de **Clean Code** e **SOLID**:

- **Standalone-first**: Sem NgModules, reduzindo o overhead e melhorando o tree-shaking.
- **Signal-based State**: Gerenciamento de estado reativo e granular com Angular Signals.
- **SRP (Single Responsibility Principle)**: Divisão clara entre componentes Smart (Containers) e Dumb (Presentational).
- **DIP (Dependency Inversion)**: Injeção de dependências desacoplada para facilitar testes e manutenção.
- **Linting & Formatação**: ESLint 9 (Flat Config) & Prettier 3 integrados para garantir consistência em cada commit.

---

## 🧪 Qualidade e Automação (CI/CD)

A confiabilidade é fundamental para qualquer projeto profissional:

- **Testes**: Executados com [Vitest](https://vitest.dev/), garantindo **100% de cobertura** em todos os componentes, services e modelos.
- **CI**: GitHub Actions valida cada `push` e `pull_request` executando o lint e a suite de testes antes de permitir o merge.
- **CD**: Deploy automatizado para GitHub Pages via GitHub Actions com permissões de segurança robustas.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 20 ou superior)
- npm (versão 10 ou superior)

### Passo a Passo

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/allangaiteir00/portifolio.git
   cd portifolio
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm start
   ```
   Acesse: `http://localhost:4200/`

4. **Executar Testes**:
   ```bash
   npm test
   ```

5. **Validar Linting**:
   ```bash
   npm run lint
   ```

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para explorar e usar como referência.

---

Desenvolvido com 💙 por **Allan Gaiteiro**.
