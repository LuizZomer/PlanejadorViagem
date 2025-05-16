import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePlanDto } from '../presentation/dto/create-plan.dto';
import { PlanGatewayInterface } from './plan-gateway.interface';
import { Plan } from '@prisma/client';
import { IPlanOutput } from '../presentation/types/output/plan.output';

@Injectable()
export class PlanGateway implements PlanGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPlans(userId: number): Promise<Plan[]> {
    return this.prisma.plan.findMany({ where: { userId } });
  }

  async createPlan(
    cityData: CreatePlanDto,
    userId: number,
  ): Promise<IPlanOutput> {
    const {
      country,
      description,
      days,
      spendingLevel,
      destination,
      host,
      latitude,
      longitude,
      endDate,
      startDate,
    } = cityData;

    const plan: Omit<
      CreatePlanDto,
      'days' | 'host' | 'endDate' | 'startDate'
    > & { hosting: string; endDate: Date; startDate: Date } = {
      country,
      description,
      destination,
      spendingLevel,
      latitude,
      longitude,
      hosting: host,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
    };

    const tripDaysWithActivities = days.map(
      ({ date, expense, averageTemp, weather, activities }) => ({
        date: new Date(date),
        expense,
        averageTemp,
        weather,
        activities: {
          create: activities.map((activity) => ({
            name: activity.name,
            description: activity.description,
            latitude: activity.latitude,
            longitude: activity.longitude,
            photoPath: activity.photoPath,
          })),
        },
      }),
    );

    return this.prisma.plan.create({
      data: {
        ...plan,
        user: { connect: { id: userId } },
        TripDay: {
          create: tripDaysWithActivities,
        },
      },
      include: {
        TripDay: {
          include: {
            activities: true,
          },
        },
      },
    });
  }

  async findPlanByExternalId(externalId: string): Promise<IPlanOutput> {
    return this.prisma.plan.findFirst({
      where: { externalId },
      include: {
        TripDay: {
          include: {
            activities: true,
          },
        },
      },
    });
  }

  async changePlanOrganization(
    organizationId: number | null,
    planExternalId: string,
  ): Promise<Plan> {
    return this.prisma.plan.update({
      data: {
        organizationId: organizationId,
      },
      where: {
        externalId: planExternalId,
      },
    });
  }
}
