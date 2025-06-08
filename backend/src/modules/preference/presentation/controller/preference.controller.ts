import { Controller, Get, UseGuards } from '@nestjs/common';
import { PreferenceService } from '../../domains/preference.service';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';

@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  async findAll() {
    return this.preferenceService.findAll();
  }
}
