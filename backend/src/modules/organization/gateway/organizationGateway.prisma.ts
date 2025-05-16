import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { OrganizationGatewayInterface } from './organizationGateway.interface';
import { IListWithUserOutput } from '../presentation/output/listWithUser.output';
import { OrganizationWithPlanOutput } from '../presentation/output/organizationWithPlan.output';

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

  async findByExternalId(externalId: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { externalId },
    });
  }

  async findByExternalIdWithPlan(
    externalId: string,
  ): Promise<OrganizationWithPlanOutput | null> {
    return this.prisma.organization.findUnique({
      where: { externalId },
      include: {
        owner: true,
        plan: true,
        organizationUsers: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async changeOrganizationUser(
    organizationId: number,
    usersId: number[],
  ): Promise<void> {
    return this.prisma.$transaction(async (prismaTransaction) => {
      const currentOrganization =
        await prismaTransaction.organization.findUnique({
          where: { id: organizationId },
          include: {
            organizationUsers: true,
          },
        });

      if (!currentOrganization) {
        throw new Error('Organization not found');
      }

      const currentUserIds = currentOrganization.organizationUsers.map(
        (userOrg) => userOrg.userId,
      );

      // 2. Determinar os que devem ser removidos
      const usersToRemove = currentUserIds.filter(
        (id) => !usersId.includes(id),
      );

      // 3. Remover os que não estão mais na lista
      await prismaTransaction.organizationUsers.deleteMany({
        where: {
          organizationId,
          userId: { in: usersToRemove },
        },
      });

      // 4. Adicionar os novos (ou manter os existentes) com upsert
      await Promise.all(
        usersId.map((userId) =>
          prismaTransaction.organizationUsers.upsert({
            where: {
              organizationUsersId: {
                organizationId,
                userId,
              },
            },
            update: {},
            create: {
              organizationId,
              userId,
            },
          }),
        ),
      );
    });
  }
}
