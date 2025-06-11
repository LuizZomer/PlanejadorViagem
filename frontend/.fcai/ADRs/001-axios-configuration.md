# ADR 001: Configuração do Axios e React Query para Comunicação com API

## Status

Aceito

## Contexto

O aplicativo precisa de uma solução robusta e flexível para comunicação com APIs REST. A escolha das bibliotecas e suas configurações impactam diretamente a manutenibilidade, performance e segurança do aplicativo.

## Decisão

Utilizaremos uma combinação de Axios e React Query para comunicação com APIs:

### Axios

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.7:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### React Query

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      retry: 3,
    },
  },
});
```

## Consequências

### Positivas

1. **Axios**:

   - Simplicidade: API simples e intuitiva
   - Interceptors: Facilita a implementação de lógica global
   - TypeScript: Suporte nativo a tipos
   - Cancelamento: Suporte a cancelamento de requisições
   - Transformação: Capacidade de transformar dados

2. **React Query**:
   - Cache automático
   - Revalidação inteligente
   - Estados de loading/error
   - Paginação e infinite scroll
   - Otimistic updates
   - Prefetching

### Negativas

1. **Axios**:

   - Bundle Size: Adiciona ~13KB ao bundle
   - Configuração: Requer configuração manual
   - URL Hardcoded: Necessidade de variáveis de ambiente

2. **React Query**:
   - Bundle Size: Adiciona ~12KB ao bundle
   - Complexidade: Curva de aprendizado inicial
   - Configuração: Necessidade de setup do QueryClient

## Alternativas Consideradas

### Fetch API

- **Prós**: Nativo, sem dependências
- **Contras**: API menos intuitiva, necessidade de polyfills

### Apenas React Query

- **Prós**: Simplificação da stack
- **Contras**: Perda de flexibilidade do Axios

### SWR

- **Prós**: Mais leve que React Query
- **Contras**: Menos recursos, comunidade menor

## Implementação

1. Mover URL base para variáveis de ambiente
2. Implementar interceptor de resposta para tratamento de erros
3. Adicionar retry logic para falhas de rede
4. Implementar refresh token
5. Configurar React Query Provider
6. Migrar requisições existentes para React Query

## Referências

- [Documentação do Axios](https://axios-http.com/)
- [Documentação do React Query](https://tanstack.com/query/latest)
- [React Native Networking](https://reactnative.dev/docs/network)
