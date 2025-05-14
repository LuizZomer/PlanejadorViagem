import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { CreateOrganizationUseCase } from './use-case/createOrganization.use-case';
import { ListAllWithUsersUseCase } from './use-case/listAllWithUsers.use-case';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly listAllWithUsersUseCase: ListAllWithUsersUseCase,
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
}
