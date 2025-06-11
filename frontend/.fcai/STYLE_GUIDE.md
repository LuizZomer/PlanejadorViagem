# Guia de Estilo de Código

## Convenções Gerais

### Nomenclatura

- **Arquivos**: PascalCase para componentes, camelCase para utilitários
  - Exemplo: `UserProfile.tsx`, `apiService.ts`
- **Componentes**: PascalCase
  - Exemplo: `Button`, `UserCard`
- **Funções**: camelCase
  - Exemplo: `handleSubmit`, `fetchUserData`
- **Variáveis**: camelCase
  - Exemplo: `userName`, `isLoading`
- **Constantes**: UPPER_SNAKE_CASE
  - Exemplo: `API_URL`, `MAX_RETRY_COUNT`

### Estrutura de Arquivos

```
ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.styles.ts
└── ComponentName.test.tsx
```

## TypeScript

### Tipos e Interfaces

- Use `interface` para objetos que serão estendidos
- Use `type` para unions, intersections e tipos simples
- Prefixe interfaces com `I` (ex: `IUserData`)
- Prefixe tipos com `T` (ex: `TResponse`)

```typescript
interface IUserData {
  id: string;
  name: string;
  email: string;
}

type TApiResponse<T> = {
  data: T;
  status: number;
};
```

### Props de Componentes

- Defina props usando interface
- Use tipos específicos ao invés de `any`
- Documente props complexas
- Não use React.FC, apenas tipe as props

```typescript
interface IButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = ({
  label,
  onPress,
  variant = "primary",
  disabled,
}: IButtonProps) => {
  return (
    <ButtonContainer variant={variant} disabled={disabled} onPress={onPress}>
      <ButtonText variant={variant}>{label}</ButtonText>
    </ButtonContainer>
  );
};
```

## React Native

### Componentes

- Use componentes funcionais com hooks
- Extraia lógica complexa para hooks customizados
- Mantenha componentes pequenos e focados
- Não use React.FC, apenas tipe as props

```typescript
interface IUserCardProps {
  user: IUserData;
  onPress: () => void;
}

const UserCard = ({ user, onPress }: IUserCardProps) => {
  return (
    <CardContainer onPress={onPress}>
      <UserName>{user.name}</UserName>
    </CardContainer>
  );
};
```

### Estilos

- Use styled-components para estilização
- Mantenha estilos em arquivo separado
- Use props para variantes de estilo
- Use theme para valores reutilizáveis

```typescript
// ComponentName.styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

// ComponentName.tsx
interface IComponentProps {
  title: string;
}

const Component = ({ title }: IComponentProps) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};
```

## Testes

### Estrutura

- Um arquivo de teste por componente
- Use descrições claras
- Teste comportamentos, não implementações

```typescript
describe("UserCard", () => {
  it("should render user name correctly", () => {
    // Test implementation
  });
});
```

## Commits

### Formato

```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

### Tipos

- feat: Nova funcionalidade
- fix: Correção de bug
- docs: Documentação
- style: Formatação
- refactor: Refatoração
- test: Testes
- chore: Tarefas gerais

## Documentação

### Componentes

- Documente props
- Inclua exemplos de uso
- Descreva comportamentos especiais

```typescript
/**
 * Botão personalizado com variantes
 * @param {string} label - Texto do botão
 * @param {() => void} onPress - Função chamada ao pressionar
 * @param {'primary' | 'secondary'} variant - Variante do botão
 */
```

## Performance

### Boas Práticas

- Use `useMemo` e `useCallback` apropriadamente
- Evite re-renders desnecessários
- Implemente lazy loading
- Otimize imagens e assets
- Use styled-components com props eficientemente

## Segurança

### Boas Práticas

- Sanitize inputs
- Valide dados
- Use HTTPS
- Implemente autenticação segura
- Proteja dados sensíveis
