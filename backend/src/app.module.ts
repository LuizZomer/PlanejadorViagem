import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CityModule } from './modules/city/city.module';
import { OpenAiModule } from './modules/openAi/openAi.module';
import { PlaceModule } from './modules/place/place.module';

@Module({
  imports: [UserModule, AuthModule, CityModule, OpenAiModule, PlaceModule],
})
export class AppModule {}
