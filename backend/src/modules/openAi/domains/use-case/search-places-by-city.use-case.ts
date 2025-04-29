import { Injectable } from '@nestjs/common';
import { openAi } from 'src/core/openAi/openAi';
import { OpenIAGateway } from '../../gateway/openAi-gateway.gpt';

@Injectable()
export class SearchPlacesByCityUseCase {
  constructor(private readonly openIAGateway: OpenIAGateway) {}

  async execute(city: string, country: string, spendingLevel: string) {
    return this.openIAGateway.searchPlaceByCity(city, country, spendingLevel);
  }
}
