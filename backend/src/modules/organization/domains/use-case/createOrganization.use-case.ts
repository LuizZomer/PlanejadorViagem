import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';
import { CreateOrganizationDto } from '../../presentation/dto/createOrganization.dto';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationGateway: OrganizationGateway,
    private readonly userService: UserService,
  ) {}

  async execute(organizationData: CreateOrganizationDto, externalId: string) {
    console.log(organizationData);

    const [usersId, owner] = await Promise.all([
      Promise.all(
        organizationData.usersExternalId.map(async (externalId) => {
          const user = await this.userService.findOneByExternalId(externalId);

          if (!user) {
            throw new BadRequestException('External id não encontrado!');
          }

          return user.id;
        }),
      ),

      this.userService.findOneByExternalId(externalId),
    ]);
    return this.organizationGateway.create(organizationData, usersId, owner.id);
  }
}
