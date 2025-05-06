import { Injectable } from '@nestjs/common';
import { OpenAIInterface } from './openAi-gateway.interface';
import { openAi } from 'src/core/openAi/openAi';
import { ISearchPlaceByCityOutput } from 'src/@types/interfaces/outputs/searchPlaceByCityOutput';
import { ISuggestCitiesByDescriptionOutput } from 'src/@types/interfaces/outputs/suggestCitiesByDescriptionOutput';

@Injectable()
export class OpenIAGateway implements OpenAIInterface {
  async searchPlaceByCity(
    city: string,
    country: string,
    spendingLevel: string,
  ): Promise<ISearchPlaceByCityOutput> {
    try {
      const res = await openAi.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sempre responda com um JSON contendo uma lista de 5 locais turísticos no seguinte formato:
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
                            "longitude": "Longitude do local",
                          }
                        ]
                      }
                        
                      Não adicione nenhuma chave no inicio como data, content e similares, me envie oque eu pedi sendo
                      a raiz do json`,
          },
          {
            role: 'user',
            content: `Me forneça 5 lugares turísticos de ${city} em ${country}, incluindo nome, descrição, latitude e longitude. Considere que o orçamento da viagem é '${spendingLevel}' (pouco, médio ou alto). Escolha lugares compatíveis com esse nível de gasto.`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const jsonResponse = res.choices[0]?.message?.content;

      console.log(JSON.parse(jsonResponse));

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
