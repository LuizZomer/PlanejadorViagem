import { Injectable } from '@nestjs/common';
import { OpenAiAxiosGatewayInterface } from './openAi-axios-gateway.interface';
import axios from 'axios';

@Injectable()
export class OpenAiAxiosGateway implements OpenAiAxiosGatewayInterface {
  async getGoogleImages(query: string): Promise<any> {
    const res = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: process.env.googleApi,
        cx: process.env.googleCx,
        q: query,
        searchType: 'image',
      },
    });

    return res.data.items || [];
  }

  async getTodayWeather(): Promise<WeatherForecastResponse> {
    const res = await axios.get<WeatherForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=${process.env.weatherApiKey}&lang=pt&units=metric`,
    );

    return res.data;
  }
}
