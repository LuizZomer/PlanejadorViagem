import { Module } from '@nestjs/common';
import { PlanService } from './domains/plan.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PlanGateway } from './gateway/plan-gateway.prisma';
import { GetPlansByUserExternalIdUseCase } from './domains/use-case/get-plans-by-user-external-id.use-case';
import { PlanController } from './presentation/controllers/plan.controller';
import { CreatePlanWithDaysUseCase } from './domains/use-case/create-plan-with-days.use-case';
import { UserModule } from '../user/user.module';
import { GetCityByExternalId } from './domains/use-case/get-city-by-external-id.use-case';

@Module({
  imports: [UserModule],
  controllers: [PlanController],
  providers: [
    PlanService,
    PrismaService,
    PlanGateway,
    GetPlansByUserExternalIdUseCase,
    // GetAllCitiesUseCase,
    CreatePlanWithDaysUseCase,
    GetCityByExternalId,
  ],
  exports: [PlanService],
})
export class CityModule {}
