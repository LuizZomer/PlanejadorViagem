import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CityModule } from './modules/plan/plan.module';
import { OpenAiModule } from './modules/openAi/openAi.module';
import { CacheModule } from '@nestjs/cache-manager';
import { FriendshipModule } from './modules/friendship/friendship.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CityModule,
    OpenAiModule,
    FriendshipModule,
    FriendshipModule,
  ],
})
export class AppModule {}
