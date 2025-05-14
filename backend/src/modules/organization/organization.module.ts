import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { OrganizationService } from './domains/organization.service';
import { CreateOrganizationUseCase } from './domains/use-case/createOrganization.use-case';
import { OrganizationGateway } from './gateway/organizationGateway.prisma';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { ListAllWithUsersUseCase } from './domains/use-case/listAllWithUsers.use-case';

@Module({
  imports: [UserModule],
  controllers: [OrganizationController],
  providers: [
    PrismaService,
    OrganizationService,
    CreateOrganizationUseCase,
    OrganizationGateway,
    ListAllWithUsersUseCase,
  ],
})
export class OrganizationModule {}
