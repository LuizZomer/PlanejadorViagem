import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';
import { CreateOrganizationDto } from '../../presentation/dto/createOrganization.dto';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationGateway: OrganizationGateway,
    private readonly userService: UserService,
  ) {}

  async execute(organizationData: CreateOrganizationDto) {
    let usersId: number[];
    if (
      organizationData.usersExternalId &&
      organizationData.usersExternalId.length === 0
    ) {
      usersId = await Promise.all(
        organizationData.usersExternalId.map(
          async (externalId) =>
            (await this.userService.findOneByExternalId(externalId)).id,
        ),
      );
    }

    console.log(usersId);

    // return this.organizationGateway.create(organizationData);
  }
}
