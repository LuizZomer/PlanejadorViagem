import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { OrganizationService } from '../../domains/organization.service';
import { CreateOrganizationDto } from '../dto/createOrganization.dto';
import { RequestWithUser } from 'src/@types/interfaces/response';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrganization(
    @Req() req: RequestWithUser,
    @Body() organization: CreateOrganizationDto,
  ) {
    const externalId = req.user.externalId;
    return this.organizationService.createOrganzation(organization, externalId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllWithUsers(@Req() req: RequestWithUser) {
    const externalId = req.user.externalId;

    return this.organizationService.listOrganizationWithUsers(externalId);
  }
}
