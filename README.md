# EnemEstudos

O EnemEstudos é um aplicativo de revisão prática para estudantes que desejam estudar em sequência, manter controle do progresso e acompanhar o desempenho em questões de provas anteriores do Enem.

## Visão geral

O projeto foi desenvolvido para permitir que o usuário:

- escolha o ano da prova;
- filtrar por disciplina ou realizar uma sessão completa;
- responder questões em sequência;
- acompanhar o progresso da sessão;
- visualizar o histórico de acertos e erros;
- alternar entre tema claro e escuro.

A aplicação usa dados em formato JSON armazenados em `public/provas/` e oferece uma experiência leve e direta para estudo autônomo.

## Funcionalidades

### 1. Seleção de prova e disciplina

Na tela inicial, o usuário pode escolher:

- ano da prova: 2020, 2021, 2022;
- disciplina: Linguagens, Ciências Humanas, Ciências da Natureza, Matemática ou prova completa;
- opção de embaralhar as questões.

Ao clicar em “Iniciar”, o app carrega as perguntas correspondentes e navega para a página de resolução.

### 2. Sessão de questões

Na página de questões, o usuário:

- visualiza o enunciado e imagens associadas;
- responde alternativas;
- confirma a resposta;
- avança para a próxima questão;
- volta para questões anteriores já respondidas;
- acompanha a barra de progresso da prova.

A lógica também registra imediatamente o resultado da questão no histórico local.

### 3. Histórico de respostas

A página de histórico exibe:

- total de questões respondidas;
- quantidade de acertos;
- quantidade de erros;
- filtro por disciplina;
- paginação de resultados;
- botão para limpar o histórico local.

Os dados são armazenados no `localStorage`, permitindo que a experiência continue mesmo após recarregar a página.

### 4. Tema claro/escuro

O cabeçalho possui um botão para alternar entre temas. A escolha é persistida no navegador e aplicada no corpo da aplicação.

### 5. Tela de conclusão da prova

Ao final da sessão, o app mostra um resumo com:

- quantidade total de questões;
- número de acertos;
- número de erros;
- acesso ao histórico completo;
- opção para iniciar outra sessão.

## Tecnologias e ferramentas usadas

Este projeto foi construído com as seguintes tecnologias:

- React 19
- TypeScript
- Vite
- React Router DOM
- Zustand para gerenciamento de estado
- Tailwind CSS
- React Type Animation
- ESLint
- [API ENEM](https://enem.dev/)

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- npm instalado

### Instalação

```bash
npm install
```

### Iniciar em modo de desenvolvimento

```bash
npm run dev
```

### Gerar build de produção

```bash
npm run build
```

### Verificar lint

```bash
npm run lint
```

## Observações importantes

- O histórico e o tema são persistidos no navegador com `localStorage`.
- O projeto foi pensado para estudo e revisão individual do conteúdo do Enem, com foco em praticidade e organização.
