# Documentação da API

## Visão Geral

A API REST do sistema de Planejamento de Viagens segue os princípios RESTful e utiliza JSON como formato de dados.

## Autenticação

### JWT Authentication

```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Resposta:**

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

## Endpoints

### Organizations

#### Criar Organização

```http
POST /organizations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "usersId": [number],
  "ownerId": number
}
```

**Resposta:**

```json
{
  "id": number,
  "name": "string",
  "externalId": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Listar Organizações com Usuários

```http
GET /organizations/with-users
Authorization: Bearer {token}
```

**Resposta:**

```json
[
  {
    "id": number,
    "name": "string",
    "users": [
      {
        "id": number,
        "name": "string",
        "email": "string"
      }
    ]
  }
]
```

#### Buscar Organização por ID Externo

```http
GET /organizations/external/{externalId}
Authorization: Bearer {token}
```

**Resposta:**

```json
{
  "id": number,
  "name": "string",
  "externalId": "string",
  "plan": {
    "id": number,
    "name": "string",
    "features": ["string"]
  }
}
```

#### Alterar Usuários da Organização

```http
PATCH /organizations/{organizationId}/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "usersId": [number]
}
```

#### Deletar Organização

```http
DELETE /organizations/{organizationId}
Authorization: Bearer {token}
```

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Não autorizado
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno

## Validação

### Organização

```typescript
interface CreateOrganizationDto {
  name: string;
  usersId: number[];
  ownerId: number;
}
```

### Respostas de Erro

```json
{
  "statusCode": number,
  "message": "string",
  "error": "string"
}
```

## Rate Limiting

- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário

## Versionamento

A API está atualmente na versão 1 (v1).

## CORS

```typescript
{
  origin: ['https://seu-dominio.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

## Exemplos de Uso

### Criar Organização

```bash
curl -X POST http://api.exemplo.com/organizations \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha Organização",
    "usersId": [1, 2, 3],
    "ownerId": 1
  }'
```

### Listar Organizações

```bash
curl -X GET http://api.exemplo.com/organizations/with-users \
  -H "Authorization: Bearer {token}"
```

## Webhooks

### Eventos Disponíveis

- `organization.created`
- `organization.updated`
- `organization.deleted`
- `user.added`
- `user.removed`

### Formato do Payload

```json
{
  "event": "string",
  "timestamp": "string",
  "data": {
    "organizationId": number,
    "userId": number
  }
}
```

## SDKs

### Node.js

```javascript
const client = new OrganizationClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.exemplo.com',
});

// Criar organização
const org = await client.createOrganization({
  name: 'Minha Org',
  usersId: [1, 2, 3],
  ownerId: 1,
});
```

## Changelog

### v1.0.0 (2024-03-15)

- Lançamento inicial da API
- Endpoints básicos de organização
- Autenticação JWT
