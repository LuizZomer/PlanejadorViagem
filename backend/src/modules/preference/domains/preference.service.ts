import { Injectable } from '@nestjs/common';
import { FindAllPreferencesUseCase } from './use-case/findAllPreferences.use-case';

@Injectable()
export class PreferenceService {
  constructor(
    private readonly findAllPreferencesUseCase: FindAllPreferencesUseCase,
  ) {}

  async findAll() {
    return this.findAllPreferencesUseCase.execute();
  }
}
