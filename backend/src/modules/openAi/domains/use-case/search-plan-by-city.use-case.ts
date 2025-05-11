import { Injectable } from '@nestjs/common';
import { openAi } from 'src/core/openAi/openAi';
import { OpenIAGateway } from '../../gateway/openAi-gateway.gpt';
import { GetPlanByCity } from '../../presentation/dto/get-plan-by-city.dto';
import axios from 'axios';

@Injectable()
export class SearchPlanByCityUseCase {
  constructor(private readonly openIAGateway: OpenIAGateway) {}

  public async execute(planData: GetPlanByCity) {
    const plan = await this.openIAGateway.searchPlanByCity(planData);

    const isUpcoming = this.verifyStartDate(planData.startDate);

    if (isUpcoming) {
      plan.days = await this.addWeather(plan.days);
    }

    const planWithDates = {
      ...plan,
      startDate: planData.startDate,
      endDate: planData.endDate,
      spendingLevel: planData.spendingLevel,
    };

    const enrichedPlan = await this.searchPlaceImages(planWithDates);

    return enrichedPlan;
  }

  // Verifica se o dia da viajem esta proximo, entre 4 dias
  private verifyStartDate(startDate: string): boolean {
    const [year, month, day] = startDate.split('-').map(Number);

    const startDateTravel = new Date(year, month - 1, day);
    startDateTravel.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fourDaysLater = new Date(today);
    fourDaysLater.setDate(today.getDate() + 4);
    fourDaysLater.setHours(0, 0, 0, 0);

    return startDateTravel >= today && startDateTravel <= fourDaysLater;
  }

  private async addWeather(dayPlan: DayPlan[]): Promise<DayPlan[]> {
    const weather = await axios.get<WeatherForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=${process.env.weatherApiKey}&lang=pt&units=metric`,
    );

    // console.log(weather);

    const forecastList = weather.data.list;

    const newDayWithWeather = dayPlan.map((day) => {
      // Filtra todas as previsões da data do dayPlan
      const forecastsForDay = forecastList.filter((forecast) =>
        forecast.dt_txt.startsWith(day.date),
      );

      // Exemplo: média de temperatura do dia
      const averageTemp =
        forecastsForDay.reduce((sum, f) => sum + f.main.temp, 0) /
        forecastsForDay.length;

      // Condição do tempo mais frequente
      const mostCommonCondition = forecastsForDay
        .map((f) => f.weather[0].description)
        .sort(
          (a, b) =>
            forecastsForDay.filter((f) => f.weather[0].description === a)
              .length -
            forecastsForDay.filter((f) => f.weather[0].description === b)
              .length,
        )
        .pop();

      return {
        ...day,
        averageTemp: Number(averageTemp.toFixed(1)),
        weather: mostCommonCondition || 'Sem dados',
      };
    });

    return newDayWithWeather;
  }

  // Transforma uma string em slug para pesquisa (espaços viram "+")
  private formatForSearch(text: string): string {
    return text.trim().replace(/\s+/g, '+');
  }

  // Verifica se o link da imagem vem de um domínio confiável
  private isAllowedImage(url: string): boolean {
    const blockedDomains = [
      'instagram.com',
      'facebook.com',
      'fbcdn.net',
      'pinterest.com',
      'brasildefato',
    ];
    return !blockedDomains.some((domain) => url.includes(domain));
  }

  // Busca uma imagem válida no Google Imagens para uma atividade
  private async fetchImageForActivity(
    activityName: string,
    destination: string,
  ): Promise<string> {
    const query = `${this.formatForSearch(activityName)}+${this.formatForSearch(destination)}`;

    try {
      const res = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            key: process.env.googleApi,
            cx: process.env.googleCx,
            q: query,
            searchType: 'image',
          },
        },
      );

      const items = res.data.items || [];
      const validItem = items.find((item) => this.isAllowedImage(item.link));

      return validItem?.link || '';
    } catch (error) {
      console.error(
        `Erro ao buscar imagem para "${activityName}":`,
        error.message,
      );
      return '';
    }
  }

  // Adiciona uma imagem válida à atividade
  private async enrichActivityWithImage(
    activity: Activity,
    destination: string,
  ): Promise<Activity> {
    const photoPath = await this.fetchImageForActivity(
      activity.name,
      destination,
    );
    return { ...activity, photoPath };
  }

  // Função principal que processa o plano de viagem
  private async searchPlaceImages(
    plan: ISearchPlanByCityOutput,
  ): Promise<ISearchPlanByCityOutput> {
    const daysWithPhotos: DayPlan[] = await Promise.all(
      plan.days.map(async (day) => {
        const activitiesWithPhotos = await Promise.all(
          day.activities.map((activity) =>
            this.enrichActivityWithImage(activity, plan.destination),
          ),
        );

        return {
          ...day,
          activities: activitiesWithPhotos,
        };
      }),
    );

    return {
      ...plan,
      days: daysWithPhotos,
    };
  }
}
