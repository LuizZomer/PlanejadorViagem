# Documentação Técnica - Backend

## Visão Geral

Este documento contém a documentação técnica completa do backend do sistema de Planejamento de Viagens.

## Estrutura da Documentação

- `architecture/` - Documentação arquitetural (C4 Model, ADRs)
- `api/` - Documentação da API (Swagger/OpenAPI)
- `development/` - Guias de desenvolvimento
- `deployment/` - Guias de deploy e infraestrutura
- `testing/` - Estratégia de testes e cobertura

## Tecnologias Principais

- Node.js
- TypeScript
- NestJS
- Prisma
- PostgreSQL

## Requisitos do Sistema

- Node.js >= 18
- PostgreSQL >= 14
- Docker (opcional)

## Configuração do Ambiente

1. Instalar dependências:

```bash
npm install
```

2. Configurar variáveis de ambiente:

```bash
cp .env.example .env
```

3. Executar migrações:

```bash
npx prisma migrate dev
```

4. Iniciar o servidor:

```bash
npm run start:dev
```

## Estrutura do Projeto

```
src/
├── modules/           # Módulos da aplicação
├── core/             # Código core compartilhado
├── utils/            # Utilitários
└── @types/           # Definições de tipos
```

## Convenções de Código

- ESLint para linting
- Prettier para formatação
- Conventional Commits para mensagens de commit
- Branch naming: feature/, bugfix/, hotfix/

## Processo de Desenvolvimento

1. Criar branch a partir da main
2. Desenvolver feature/bugfix
3. Criar PR com template preenchido
4. Code review
5. Merge após aprovação

## Contatos

- Tech Lead: [Nome do Tech Lead]
- DevOps: [Nome do DevOps]
- Product Owner: [Nome do PO]
