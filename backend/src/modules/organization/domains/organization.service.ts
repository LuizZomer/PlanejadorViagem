import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { CreateOrganizationUseCase } from './use-case/createOrganization.use-case';
import { ListAllWithUsersUseCase } from './use-case/listAllWithUsers.use-case';
import { FindByExternalIdUseCase } from './use-case/findByExternalId.use-case';
import { FindByExternalIdWithPlanUseCase } from './use-case/findByExternalIdWithPlan.use-case';
import { ChangeUserOrganizationUseCase } from './use-case/changeUserOrganization.use-case';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly listAllWithUsersUseCase: ListAllWithUsersUseCase,
    private readonly findByExternalIdUseCase: FindByExternalIdUseCase,
    private readonly findByExternalIdWithPlanUseCase: FindByExternalIdWithPlanUseCase,
    private readonly changeUserOrganizationUseCase: ChangeUserOrganizationUseCase,
  ) {}

  async createOrganzation(
    organizationData: CreateOrganizationDto,
    externalId: string,
  ) {
    return this.createOrganizationUseCase.execute(organizationData, externalId);
  }

  async listOrganizationWithUsers(externalId: string) {
    return this.listAllWithUsersUseCase.execute(externalId);
  }

  async findByExternalId(externalId: string) {
    return this.findByExternalIdUseCase.execute(externalId);
  }

  async findByExternalIdWithPlan(externalId: string) {
    return this.findByExternalIdWithPlanUseCase.execute(externalId);
  }

  async changeUserOrganization(
    organizationExternalId: string,
    usersExternalId: string[],
  ) {
    return this.changeUserOrganizationUseCase.execute(
      organizationExternalId,
      usersExternalId,
    );
  }
}
