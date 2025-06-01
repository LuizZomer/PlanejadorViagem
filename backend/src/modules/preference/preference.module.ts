import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PreferenceGateway } from './gateway/preferenceGateway.prisma';
import { PreferenceService } from './domains/preference.service';
import { FindAllPreferencesUseCase } from './domains/use-case/findAllPreferences.use-case';
import { PreferenceController } from './presentation/controller/preference.controller';

@Module({
  controllers: [PreferenceController],
  providers: [
    PrismaService,
    PreferenceGateway,
    PreferenceService,
    FindAllPreferencesUseCase,
  ],
  exports: [PreferenceService],
})
export class PreferenceModule {}
