import { Module } from '@nestjs/common';
import { SearchPlanByCityUseCase } from './domains/use-case/search-plan-by-city.use-case';
import { OpenAiService } from './domains/openAi.service';
import { OpenIaController } from './presentation/controller/openIa.controller';
import { OpenIAGateway } from './gateway/openAi/openAi-gateway.gpt';
import { SuggestCitiesByDescriptionUseCase } from './domains/use-case/search-cities-by-description.use-case';
import { OpenAiAxiosGateway } from './gateway/axios/openAi-axios-gateway.axios';

@Module({
  controllers: [OpenIaController],
  providers: [
    OpenAiService,
    SearchPlanByCityUseCase,
    SuggestCitiesByDescriptionUseCase,
    OpenIAGateway,
    OpenAiAxiosGateway,
  ],
  exports: [OpenAiService],
})
export class OpenAiModule {}
