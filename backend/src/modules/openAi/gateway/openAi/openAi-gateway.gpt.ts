import { Injectable } from '@nestjs/common';
import { ISuggestCitiesByDescriptionOutput } from 'src/@types/interfaces/outputs/suggestCitiesByDescriptionOutput';
import { openAi } from 'src/core/openAi/openAi';
import { GetPlanByCity } from '../../presentation/dto/get-plan-by-city.dto';
import { OpenAIInterface } from './openAi-gateway.interface';

@Injectable()
export class OpenIAGateway implements OpenAIInterface {
  async searchPlanByCity({
    country,
    destination,
    endDate,
    hosting,
    spendingLevel,
    startDate,
  }: GetPlanByCity): Promise<ISearchPlanByCityOutput> {
    try {
      const res = await openAi.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é um assistente de planejamento de viagens.
      
      Sempre responda com um JSON contendo o plano de viagem no seguinte formato:
      
      {
        "destination": "Nome da cidade",
        "country": "Nome do país",
        "description": "Descrição geral do destino",
        "latitude": "Latitude da cidade",
        "longitude": "Longitude da cidade",
        "host": "Lugar para a hospedagem", ##Caso o usuário peça
        "days": [
          {
            "date": "YYYY-MM-DD",
            "expense": "Total de gastos deste dia em reais", 
            "activities": [
              {
                "name": "Nome da atividade turística",
                "description": "Breve descrição",
                "latitude": "Latitude da atividade",
                "longitude": "Longitude da atividade",
                "estimatedTime": "Tempo estimado que o usuario passará no local em minutos"
              }
            ]
          }
        ]
      }
      
      - A chave "days" deve conter um item para **cada dia do período da viagem**.
      - As atividades devem estar distribuídas ao longo dos dias, com 2 a 4 por dia.
      - As sugestões devem ser compatíveis com o nível de gasto indicado (pouco, médio, alto).
      - Todas as latitudes e longitudes devem ser **apenas números**, sem texto.
      - Não inclua nenhuma chave extra como "data", "content" ou metadados. O JSON deve iniciar com a raiz solicitada acima.
      - Leve em consideração a distancia entre os lugares para recomendar sempre os mais proximos no mesmo dia
      `,
          },
          {
            role: 'user',
            content: `Crie um plano de viagem para a cidade de ${destination}, em ${country}, com início em ${startDate} e fim em ${endDate}, considerando o nível de gasto '${spendingLevel}' (pouco, médio ou alto). ${hosting ? 'E preciso saber da hospedagem' : ''}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const jsonResponse = res.choices[0]?.message?.content;

      console.table(JSON.parse(jsonResponse));

      return jsonResponse ? JSON.parse(jsonResponse) : null;
    } catch (err) {
      console.error('Erro ao chamar OpenAI:', err);
      throw new Error(
        'Falha ao buscar locais turísticos. Tente novamente mais tarde',
      );
    }
  }

  async suggestCityByDescription(
    description: string,
    spendingLevel: string,
  ): Promise<ISuggestCitiesByDescriptionOutput> {
    try {
      const res = await openAi.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sempre responda com um JSON contendo uma lista de 3 cidades com 5 locais turísticos cada, no seguinte formato:
          
          {
            "cities": [
              {
                "name": "Nome da cidade",
                "country": "Nome do pais"
                "description": "Uma breve descrição da cidade",
                "latitude": "Latitude da cidade",
                "longitude": "Longitude da cidade",
                "places": [
                  {
                    "name": "Nome do local",
                    "description": "Breve descrição do local",
                    "latitude": "Latitude do local",
                    "longitude": "Longitude do local"
                  }
                ]
              }
            ]
          }`,
          },
          {
            role: 'user',
            content: `Me forneça 3 cidades com essa descrição: ${description}. Considere que o orçamento da viagem é '${spendingLevel}' (pouco, médio ou alto). Escolha lugares compatíveis com esse nível de gasto.`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const jsonResponse = res.choices[0]?.message?.content;

      return jsonResponse ? JSON.parse(jsonResponse) : null;
    } catch (err) {
      console.error('Erro ao chamar OpenAI:', err);
      throw new Error(
        'Falha ao sugerir cidades com locais turísticos. Tente novamente mais tarde',
      );
    }
  }
}
