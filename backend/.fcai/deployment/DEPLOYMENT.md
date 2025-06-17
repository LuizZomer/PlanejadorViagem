# Guia de Deploy

## Visão Geral

Este documento descreve o processo de deploy do backend do sistema de Planejamento de Viagens.

## Ambientes

### Desenvolvimento

- URL: `https://dev-api.planejador-viagem.com`
- Branch: `develop`
- Auto-deploy: Sim

### Homologação

- URL: `https://staging-api.planejador-viagem.com`
- Branch: `main`
- Auto-deploy: Sim

### Produção

- URL: `https://api.planejador-viagem.com`
- Branch: `main`
- Auto-deploy: Não

## Infraestrutura

### AWS

#### Serviços Utilizados

- ECS (Container)
- RDS (PostgreSQL)
- ElastiCache (Redis)
- CloudWatch (Logs)
- Route 53 (DNS)
- ACM (SSL)

#### Arquitetura

```
[Route 53] → [ALB] → [ECS Cluster]
                    ↓
              [RDS] [ElastiCache]
```

## Pipeline de Deploy

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: planejador-viagem
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: task-definition.json
          service: planejador-viagem-service
          cluster: planejador-viagem-cluster
          wait-for-service-stability: true
```

## Docker

### Dockerfile

```dockerfile
# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start:prod"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/planejador
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=planejador
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Variáveis de Ambiente

### Desenvolvimento

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/planejador
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret
```

### Produção

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@rds-instance:5432/planejador
REDIS_URL=redis://elasticache-instance:6379
JWT_SECRET=prod-secret
```

## Monitoramento

### CloudWatch

#### Métricas

- CPU Usage
- Memory Usage
- Request Count
- Error Rate
- Latency

#### Logs

- Application Logs
- Access Logs
- Error Logs

### Alertas

```yaml
Alarms:
  HighCPUUsage:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: CPU usage is too high
      MetricName: CPUUtilization
      Namespace: AWS/ECS
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 80
      ComparisonOperator: GreaterThanThreshold
      Dimensions:
        - Name: ClusterName
          Value: planejador-viagem-cluster
```

## Backup

### RDS

- Automated backups: Diário
- Retention: 7 dias
- Point-in-time recovery: Ativado

### Redis

- Snapshot: A cada 6 horas
- Retention: 3 dias

## Segurança

### SSL/TLS

- Certificado: AWS Certificate Manager
- Renewal: Automático
- Protocol: TLS 1.2+

### Firewall

- Security Groups
- NACLs
- WAF Rules

## Rollback

### Procedimento

1. Identificar versão estável
2. Atualizar task definition
3. Forçar novo deploy
4. Verificar logs
5. Monitorar métricas

### Script

```bash
#!/bin/bash

# Rollback script
VERSION=$1
CLUSTER="planejador-viagem-cluster"
SERVICE="planejador-viagem-service"

# Update service
aws ecs update-service \
  --cluster $CLUSTER \
  --service $SERVICE \
  --task-definition $VERSION \
  --force-new-deployment
```

## Troubleshooting

### Problemas Comuns

1. **Deploy Falha**

   - Verificar logs do ECS
   - Confirmar variáveis de ambiente
   - Verificar permissões IAM

2. **Aplicação Não Inicia**

   - Verificar logs da aplicação
   - Confirmar conexão com banco
   - Verificar memória disponível

3. **Performance Degradada**
   - Verificar métricas do CloudWatch
   - Analisar logs de erro
   - Verificar uso de recursos

## Manutenção

### Rotinas

1. **Diária**

   - Monitorar logs
   - Verificar métricas
   - Backup automático

2. **Semanal**

   - Análise de performance
   - Limpeza de logs
   - Verificação de segurança

3. **Mensal**
   - Atualização de dependências
   - Rotação de certificados
   - Análise de custos

## Recursos

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
