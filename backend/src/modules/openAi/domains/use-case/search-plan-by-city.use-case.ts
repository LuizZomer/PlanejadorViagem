import { Injectable } from '@nestjs/common';
import { openAi } from 'src/core/openAi/openAi';
import { OpenIAGateway } from '../../gateway/openAi-gateway.gpt';
import { GetPlanByCity } from '../../presentation/dto/get-plan-by-city.dto';

@Injectable()
export class SearchPlanByCityUseCase {
  constructor(private readonly openIAGateway: OpenIAGateway) {}

  async execute(planData: GetPlanByCity) {
    return this.openIAGateway.searchPlanByCity(planData);
  }
}
