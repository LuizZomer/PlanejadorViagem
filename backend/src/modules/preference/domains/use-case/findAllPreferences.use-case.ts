import { Injectable } from '@nestjs/common';
import { PreferenceGateway } from '../../gateway/preferenceGateway.prisma';

@Injectable()
export class FindAllPreferencesUseCase {
  constructor(private readonly preferenceGateway: PreferenceGateway) {}

  async execute() {
    return this.preferenceGateway.findAll();
  }
}
