import { Injectable } from '@nestjs/common';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';
import { IListWithUserOutput } from '../../presentation/output/listWithUser.output';
import { IListWithUserMapperOutput } from '../../presentation/output/listWithUserMapper.output';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class ListAllWithUsersUseCase {
  constructor(
    private readonly organizationGateway: OrganizationGateway,
    private readonly userService: UserService,
  ) {}

  async execute(externalId: string) {
    const user = await this.userService.findOneByExternalId(externalId);
    const organization = await this.organizationGateway.listWithUsers(user.id);

    return this.mapperOrganizationWithUsers(organization);
  }

  mapperOrganizationWithUsers(
    organization: IListWithUserOutput[],
  ): IListWithUserMapperOutput[] {
    return organization.map(
      ({ createdAt, externalId, name, organizationUsers }) => ({
        createdAt,
        externalId,
        name,
        organizationUsers: organizationUsers.map(({ id, user }) => ({
          id,
          user: {
            externalId: user.externalId,
            username: user.username,
          },
        })),
      }),
    );
  }
}
