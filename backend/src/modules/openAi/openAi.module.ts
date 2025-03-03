import { Module } from '@nestjs/common';
import { SearchPlacesByCityUseCase } from './domains/use-case/search-places-by-city.use-case';
import { OpenAiService } from './domains/openAi.service';
import { OpenIaController } from './presentation/controller/openIa.controller';

@Module({
  controllers: [OpenIaController],
  providers: [OpenAiService, SearchPlacesByCityUseCase],
  exports: [OpenAiService],
})
export class OpenAiModule {}
