# Guia de Testes

## Visão Geral

Este documento descreve a estratégia de testes do backend do sistema de Planejamento de Viagens.

## Tipos de Testes

### 1. Testes Unitários

#### Configuração

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.module.ts', '!src/main.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

#### Exemplo

```typescript
// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from './user.repository.interface';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>(IUserRepository);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = await service.createUser(userData);

      expect(result).toBeDefined();
      expect(result.name).toBe(userData.name);
      expect(result.email).toBe(userData.email);
    });
  });
});
```

### 2. Testes de Integração

#### Configuração

```typescript
// test/jest-e2e.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
```

#### Exemplo

```typescript
// user.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('John Doe');
      });
  });
});
```

### 3. Testes de Performance

#### Configuração

```typescript
// performance.config.ts
export const performanceConfig = {
  duration: 300, // segundos
  users: 100,
  rampUp: 30, // segundos
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições abaixo de 500ms
    http_req_failed: ['rate<0.01'], // menos de 1% de falhas
  },
};
```

#### Exemplo

```typescript
// performance.spec.ts
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://api.exemplo.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## Cobertura de Testes

### Configuração

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.config.js"
  }
}
```

### Relatório

```bash
# Gerar relatório de cobertura
npm run test:cov

# Visualizar relatório
open coverage/lcov-report/index.html
```

## Mocks e Fixtures

### Mocks

```typescript
// mocks/user.repository.mock.ts
export class UserRepositoryMock implements IUserRepository {
  private users: User[] = [];

  async findById(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      id: this.users.length + 1,
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }
}
```

### Fixtures

```typescript
// fixtures/users.fixture.ts
export const usersFixture = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
```

## Testes de Segurança

### OWASP ZAP

```yaml
# zap-config.yaml
rules:
  - id: 10016
    enabled: true
  - id: 10020
    enabled: true
  - id: 10021
    enabled: true

target: http://localhost:3000
context: planejador-viagem
```

### Exemplo de Teste

```typescript
// security.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Security Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should prevent SQL injection', () => {
    return request(app.getHttpServer())
      .get('/users')
      .query({ id: "1' OR '1'='1" })
      .expect(400);
  });

  it('should prevent XSS', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
      })
      .expect(400);
  });
});
```

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Run e2e tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Boas Práticas

1. **Organização**

   - Testes próximos ao código
   - Nomes descritivos
   - Setup e teardown adequados

2. **Cobertura**

   - Mínimo de 80% de cobertura
   - Foco em casos de borda
   - Testes de falha

3. **Performance**

   - Testes rápidos
   - Mocks eficientes
   - Dados de teste otimizados

4. **Manutenção**
   - DRY (Don't Repeat Yourself)
   - Fixtures reutilizáveis
   - Helpers compartilhados

## Troubleshooting

### Problemas Comuns

1. **Testes Lentos**

   - Usar mocks
   - Otimizar setup
   - Paralelizar testes

2. **Falsos Positivos**

   - Verificar timeouts
   - Ajustar assertions
   - Limpar estado

3. **Cobertura Baixa**
   - Identificar gaps
   - Adicionar casos
   - Refatorar código

## Recursos

- [Jest Documentation](https://jestjs.io/docs)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [k6 Documentation](https://k6.io/docs)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
