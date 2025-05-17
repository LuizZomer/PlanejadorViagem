export class OpenAiAxiosGatewayInterface {
  getTodayWeather: () => Promise<WeatherForecastResponse>;
  getGoogleImages: (query: string) => Promise<any>;
}
