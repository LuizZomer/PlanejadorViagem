import { Injectable } from '@nestjs/common';
// import { GetAllCitiesUseCase } from './use-case/get-all-cities.use-case';
//import { TCreateCity } from 'src/@types/types/create-city.type';
import { CreatePlanWithDaysUseCase } from './use-case/create-plan-with-days.use-case';
import { CreatePlanDto } from '../presentation/dto/create-plan.dto';
import { GetPlansByUserExternalIdUseCase } from './use-case/get-plans-by-user-external-id.use-case';
import { GetCityByExternalId } from './use-case/get-city-by-external-id.use-case';
import { ChangePlanOrganizationUseCase } from './use-case/change-plan-organization.use-case';
import { DeletePlanUseCase } from './use-case/delete-plan';

@Injectable()
export class PlanService {
  constructor(
    // private readonly getAllCitiesUseCase: GetAllCitiesUseCase,
    private readonly createPlanWithDaysUseCase: CreatePlanWithDaysUseCase,
    private readonly getPlansByUserExternalIdUseCase: GetPlansByUserExternalIdUseCase,
    private readonly getCityByExternalId: GetCityByExternalId,
    private readonly changePlanOrganizationUseCase: ChangePlanOrganizationUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
  ) {}

  // async getAllCities() {
  //   return this.getAllCitiesUseCase.execute();
  // }

  async getAllPlanByUserExternalId(username: string) {
    return this.getPlansByUserExternalIdUseCase.execute(username);
  }

  async createPlan(cityData: CreatePlanDto, username: string) {
    return this.createPlanWithDaysUseCase.execute(cityData, username);
  }

  async findCityByExternalId(externalId: string) {
    return this.getCityByExternalId.execute(externalId);
  }

  async changePlanOrganization(
    organizationId: string | null,
    planExternalId: string,
  ) {
    return this.changePlanOrganizationUseCase.execute(
      organizationId,
      planExternalId,
    );
  }

  async deletePlan(planExternalId: string) {
    return this.deletePlanUseCase.execute(planExternalId);
  }
}
