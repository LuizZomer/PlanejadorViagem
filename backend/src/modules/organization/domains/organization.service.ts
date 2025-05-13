import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { CreateOrganizationUseCase } from './use-case/createOrganization.use-case';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
  ) {}

  async createOrganzation(organizationData: CreateOrganizationDto) {
    return this.createOrganizationUseCase.execute(organizationData);
  }
}
