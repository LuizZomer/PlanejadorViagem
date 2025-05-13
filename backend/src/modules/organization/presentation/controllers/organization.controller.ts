import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { OrganizationService } from '../../domains/organization.service';
import { CreateOrganizationDto } from '../dto/createOrganization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrganization(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.createOrganzation(organization);
  }
}
