import { Injectable } from '@nestjs/common';
import { openAi } from 'src/core/openAi/openAi';

@Injectable()
export class SearchPlacesByCityUseCase {
  async execute(city: string, country: string, spendingLevel: string) {
    try {
      const res = await openAi.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sempre responda com um JSON contendo uma lista de 5 locais turísticos no seguinte formato:
                {
                  "places": [
                    {
                      "name": "Nome do local",
                      "description": "Breve descrição do local",
                      "latitude": "Latitude do local",
                      "longitude": "Longitude do local",
                    }
                  ]
                }`,
          },
          {
            role: 'user',
            content: `Me forneça 5 lugares turísticos de ${city} em ${country}, incluindo nome, descrição, latitude e longitude. Considere que o orçamento da viagem é '${spendingLevel}' (pouco, médio ou alto). Escolha lugares compatíveis com esse nível de gasto.`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      console.log(res.choices[0].message.content);

      const jsonResponse = res.choices[0]?.message?.content;

      return jsonResponse ? JSON.parse(jsonResponse) : null;
    } catch (err) {
      console.error('Erro ao chamar OpenAI:', err);
      throw new Error(
        'Falha ao buscar locais turísticos. Tente novamente mais tarde',
      );
    }
  }
}
