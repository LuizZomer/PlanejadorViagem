# Guia de Desenvolvimento

## Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js >= 18
- npm >= 9
- Git
- VS Code (recomendado)
- Docker (opcional)

### Extensões VS Code Recomendadas

- ESLint
- Prettier
- GitLens
- TypeScript Hero
- Jest Runner
- Docker

## Configuração Inicial

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/planejador-viagem.git
cd planejador-viagem/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Configure o banco de dados:

```bash
npx prisma migrate dev
```

## Estrutura do Projeto

```
src/
├── modules/           # Módulos da aplicação
│   ├── organization/  # Módulo de organizações
│   └── user/         # Módulo de usuários
├── core/             # Código core compartilhado
├── utils/            # Utilitários
└── @types/           # Definições de tipos
```

## Padrões de Código

### Nomenclatura

- **Arquivos**: kebab-case

  - `user-service.ts`
  - `create-user.dto.ts`

- **Classes**: PascalCase

  - `UserService`
  - `CreateUserDto`

- **Interfaces**: PascalCase com prefixo I

  - `IUserRepository`
  - `IUserService`

- **Variáveis e Funções**: camelCase
  - `getUserById`
  - `userRepository`

### Estrutura de Módulos

```typescript
// Módulo típico
src/modules/user/
├── presentation/     # Controllers, DTOs
├── application/      # Use Cases, Services
├── domain/          # Entities, Value Objects
└── infrastructure/  # Repositories, External Services
```

## Testes

### Unitários

```typescript
// user.service.spec.ts
describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### E2E

```typescript
// user.e2e-spec.ts
describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });
});
```

## Git Workflow

### Branches

- `main`: Produção
- `develop`: Desenvolvimento
- `feature/*`: Novas features
- `bugfix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes

### Commits

```
feat: adiciona autenticação JWT
fix: corrige validação de email
docs: atualiza README
style: formata código
refactor: reorganiza módulos
test: adiciona testes de usuário
chore: atualiza dependências
```

### Pull Requests

1. Crie uma branch a partir de `develop`
2. Desenvolva sua feature
3. Atualize a documentação
4. Adicione testes
5. Crie o PR com template preenchido

## Code Review

### Checklist

- [ ] Código segue os padrões
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem código morto
- [ ] Tratamento de erros adequado
- [ ] Performance considerada
- [ ] Segurança verificada

## Debugging

### VS Code

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/main.ts"
    }
  ]
}
```

### Logging

```typescript
import { Logger } from '@nestjs/common';

const logger = new Logger('UserService');

logger.log('User created');
logger.error('Error creating user', error.stack);
```

## Performance

### Otimizações

1. **Caching**

   ```typescript
   @Cacheable('users')
   async findById(id: number): Promise<User> {
     return this.repository.findById(id);
   }
   ```

2. **Lazy Loading**

   ```typescript
   @LazyLoad()
   async getOrganizationUsers(): Promise<User[]> {
     return this.userRepository.findByOrganizationId(this.id);
   }
   ```

3. **Pagination**
   ```typescript
   async findAll(page: number, limit: number): Promise<PaginatedResult<User>> {
     return this.repository.findAll(page, limit);
   }
   ```

## Segurança

### Boas Práticas

1. **Validação de Input**

   ```typescript
   @IsEmail()
   @IsNotEmpty()
   email: string;
   ```

2. **Sanitização**

   ```typescript
   @Transform(({ value }) => sanitizeHtml(value))
   description: string;
   ```

3. **Autenticação**
   ```typescript
   @UseGuards(JwtAuthGuard)
   @Roles('admin')
   async deleteUser(@Param('id') id: number) {
     return this.userService.delete(id);
   }
   ```

## Monitoramento

### Logging

```typescript
import { Logger } from '@nestjs/common';

const logger = new Logger('UserService');

logger.log('User created', { userId: user.id });
logger.error('Error creating user', error.stack, { userId });
```

### Métricas

```typescript
import { MetricsService } from '@nestjs/metrics';

@Injectable()
export class UserService {
  constructor(private metrics: MetricsService) {}

  async createUser(user: CreateUserDto) {
    const timer = this.metrics.startTimer('user_creation_time');
    try {
      const result = await this.repository.create(user);
      timer.end();
      return result;
    } catch (error) {
      this.metrics.increment('user_creation_errors');
      throw error;
    }
  }
}
```

## Troubleshooting

### Problemas Comuns

1. **Erro de Conexão com Banco**

   - Verifique as variáveis de ambiente
   - Confirme se o banco está rodando
   - Verifique as credenciais

2. **Erro de Compilação**

   - Limpe o cache: `npm run clean`
   - Reinstale dependências: `npm ci`
   - Verifique versões do Node/npm

3. **Testes Falhando**
   - Verifique o ambiente de teste
   - Confirme mocks e fixtures
   - Verifique configurações do Jest

## Recursos Úteis

- [Documentação NestJS](https://docs.nestjs.com)
- [Documentação Prisma](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Node.js Docs](https://nodejs.org/docs)
