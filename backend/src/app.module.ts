import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FriendshipModule } from './modules/friendship/friendship.module';
import { OpenAiModule } from './modules/openAi/openAi.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PlanModule } from './modules/plan/plan.module';
import { UserModule } from './modules/user/user.module';
import { PreferenceModule } from './modules/preference/preference.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PlanModule,
    OpenAiModule,
    FriendshipModule,
    FriendshipModule,
    OrganizationModule,
    PreferenceModule,
  ],
})
export class AppModule {}
