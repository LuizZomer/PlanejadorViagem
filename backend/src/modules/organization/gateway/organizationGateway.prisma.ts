import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { OrganizationGatewayInterface } from './organizationGateway.interface';
import { IListWithUserOutput } from '../presentation/output/listWithUser.output';

@Injectable()
export class OrganizationGateway implements OrganizationGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    organizationData: CreateOrganizationDto,
    usersId: number[],
    ownerId: number,
  ): Promise<Organization> {
    return this.prisma.$transaction(async (prismaTransaction) => {
      const org = await prismaTransaction.organization.create({
        data: { name: organizationData.name, ownerId },
      });

      const orgUsers = usersId.map((userId) => ({
        userId,
        organizationId: org.id,
      }));

      await prismaTransaction.organizationUsers.createMany({
        data: orgUsers,
      });

      return org;
    });
  }

  async listWithUsers(userId: number): Promise<IListWithUserOutput[]> {
    return this.prisma.organization.findMany({
      include: {
        organizationUsers: {
          include: {
            user: true,
          },
        },
      },
      where: {
        ownerId: userId,
      },
    });
  }
}
