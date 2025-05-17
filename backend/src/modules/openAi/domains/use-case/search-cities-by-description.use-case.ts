import { Injectable } from '@nestjs/common';
import { OpenIAGateway } from '../../gateway/openAi/openAi-gateway.gpt';

@Injectable()
export class SuggestCitiesByDescriptionUseCase {
  constructor(private readonly openIAGateway: OpenIAGateway) {}

  async execute(description: string, spendingLevel: string) {
    return this.openIAGateway.suggestCityByDescription(
      description,
      spendingLevel,
    );
  }
}
