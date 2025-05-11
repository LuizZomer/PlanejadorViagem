import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/@types/interfaces/response';
import { getCitiesCacheKey } from 'src/utils/cache/citiesCache';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { PlanService } from '../../domains/plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getAllCities(@Req() req: RequestWithUser) {
  //   const cities = await this.cityService.getAllCities();

  //   return {
  //     statusCode: HttpStatus.OK,
  //     content: { cities },
  //   };
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPlansByUserExternalId(@Req() req: RequestWithUser) {
    const username = req.user.username;
    const cacheName = getCitiesCacheKey(username);

    let plans: IFindAllPlansOutput[];

    plans = await this.cacheManager.get(cacheName);

    if (!plans) {
      plans = await this.planService.getAllPlanByUserExternalId(username);
      await this.cacheManager.set(cacheName, plans);
    }

    return {
      statusCode: HttpStatus.OK,
      content: { plans },
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':externalId')
  async getCityByExternalId(@Param('externalId') externalId: string) {
    return this.planService.findCityByExternalId(externalId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPlan(@Req() req: RequestWithUser, @Body() body: CreatePlanDto) {
    const username = req.user.username;
    const cacheName = getCitiesCacheKey(username);

    const newPlan = await this.planService.createPlan(body, username);

    this.cacheManager.del(cacheName);

    return {
      statusCode: HttpStatus.CREATED,
      content: { newPlan },
    };
  }
}
