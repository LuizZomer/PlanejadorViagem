import { BadRequestException, Injectable } from '@nestjs/common';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class ChangeUserOrganizationUseCase {
  constructor(
    private readonly organizationGateway: OrganizationGateway,
    private readonly userService: UserService,
  ) {}

  async execute(organizationExternalId: string, usersExternalId: string[]) {
    const [org, usersId] = await Promise.all([
      this.organizationGateway.findByExternalId(organizationExternalId),
      Promise.all(
        usersExternalId.map((userExternalId) =>
          this.userService
            .findOneByExternalId(userExternalId)
            .then((user) => user.id),
        ),
      ),
    ]);

    const ownerIsMerber = usersId.some((id) => id === org.ownerId);

    if (ownerIsMerber)
      throw new BadRequestException(
        'O criador não pode ser membro da própria organização',
      );

    return this.organizationGateway.changeOrganizationUser(org.id, usersId);
  }
}
