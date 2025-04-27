import { TCreateCity } from 'src/@types/types/create-city.type';
import { CityGateway } from '../../gateway/city-gateway.prisma';
import { CreateCityDto } from '../../presentation/dto/create-city.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class CreateCityWithUseCase {
  constructor(
    private readonly cityGateway: CityGateway,
    private readonly userService: UserService,
  ) {}

  async execute(cityData: CreateCityDto, username: string) {
    const user = await this.userService.findOneByUsername(username);

    return this.cityGateway.createCity(cityData, user.id);
  }
}
