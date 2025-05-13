import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { OrganizationGatewayInterface } from './organizationGateway.interface';

@Injectable()
export class OrganizationGateway implements OrganizationGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizationData: CreateOrganizationDto): Promise<Organization> {
    return this.prisma.organization.create({
      data: organizationData,
    });
  }
}
