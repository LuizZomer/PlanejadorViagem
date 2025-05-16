import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { OrganizationService } from './domains/organization.service';
import { CreateOrganizationUseCase } from './domains/use-case/createOrganization.use-case';
import { OrganizationGateway } from './gateway/organizationGateway.prisma';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { ListAllWithUsersUseCase } from './domains/use-case/listAllWithUsers.use-case';
import { FindByExternalIdUseCase } from './domains/use-case/findByExternalId.use-case';
import { FindByExternalIdWithPlanUseCase } from './domains/use-case/findByExternalIdWithPlan.use-case';
import { ChangeUserOrganizationUseCase } from './domains/use-case/changeUserOrganization.use-case';

@Module({
  imports: [UserModule],
  controllers: [OrganizationController],
  providers: [
    PrismaService,
    OrganizationService,
    CreateOrganizationUseCase,
    OrganizationGateway,
    ListAllWithUsersUseCase,
    FindByExternalIdUseCase,
    FindByExternalIdWithPlanUseCase,
    ChangeUserOrganizationUseCase,
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
