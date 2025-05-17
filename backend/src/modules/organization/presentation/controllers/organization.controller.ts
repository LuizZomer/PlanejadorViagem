import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { OrganizationService } from '../../domains/organization.service';
import { CreateOrganizationDto } from '../dto/createOrganization.dto';
import { RequestWithUser } from 'src/@types/interfaces/response';
import { ChangeUserOrganization } from '../dto/changeUserOrganization.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get(':organizationExternalId')
  async findByExternalIdWithPlan(
    @Param('organizationExternalId') organizationExternalId: string,
  ) {
    return this.organizationService.findByExternalIdWithPlan(
      organizationExternalId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch('members')
  async changeUserOrganization(
    @Body() { organizationExternalId, usersExternalId }: ChangeUserOrganization,
  ) {
    await this.organizationService.changeUserOrganization(
      organizationExternalId,
      usersExternalId,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Membros atualizados com sucesso!',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete(':organizationExternalId')
  async deleteOrganization(
    @Param('organizationExternalId') organizationExternalId: string,
  ) {
    const org = await this.organizationService.deleteOrganization(
      organizationExternalId,
    );

    return {
      statusCode: HttpStatus.OK,
      content: org,
    };
  }
}
