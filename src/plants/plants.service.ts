import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantDto } from './dto/CreatePlantDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SortService } from 'src/sort/sort.service';
import { EventService } from 'src/event/event.service';
import { handlePrismaError } from 'src/common/utils/handlePrismaError';

import { SeasonService } from 'src/season/season.service';
import { UpdatePlantDto } from 'src/plants/dto/UpdatePlant.dto';

@Injectable()
export class PlantsService {
  constructor(
    private prismaService: PrismaService,
    private sortService: SortService,
    private readonly eventService: EventService,
    private readonly seasonService: SeasonService,
  ) {
  }

  async create(dto: CreatePlantDto, user: User) {
    // cоздала Cорт
    const sort = await this.sortService.create(dto.sort);

    const currentSeason = await this.seasonService.findCurrentSeasonByUserId(user.id, '2025');

    if (!currentSeason) {
      throw new NotFoundException('Сезон не найден (или не создан)');
    }

    // cоздала Плант с sort.id,
    const plant = await this.prismaService.plant.create({
      data: {
        kindPlant: dto.kindPlant,
        isPerennial: dto.isPerennial,
        userId: user.id,
        sortId: sort.id, // сюда кладу только что созданную сущность Сорт
        season: { connect: { id: currentSeason.id } }, // сюда соед уже существующ сущность Сезон
        locationText: dto.locationText,
        result: '',
      },
    });

    // если были переданы данные по event, то берем готовый метод из eventService и созд Евент
    if (dto.event) {
      await this.eventService.create({
        ...dto.event,
        plantId: plant.id,
        userId: user.id,
      });
    }

    return plant;
  }

  async update(dto: UpdatePlantDto & { plantId: string, user: User }) {

    // Изменять Плант может только тот, кто его создавал
    try{
      // нашли Плант
      const plant = await this.findById(dto.plantId)

      // проверка, у этого Плант создатель этот юзер который запрос направляет ?
      if(plant){
        if( plant.userId===dto.user.id)
        {

          return this.prismaService.plant.update({where:{id: plant.id},data:{
              kindPlant: dto.kindPlant,
              sort:dto.sort
            })
        }
      }
    }


    catch(err){
        throw new ForbiddenException("этот пользователь не может вносить изменения тк не является создателем Plant")
    }
  }
  async findAll() {
    return this.prismaService.plant.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByIdWithEvents(id: string) {
    try {
      return this.prismaService.plant.findUnique({
        where: { id },
        select: { events: { orderBy: { createdAt: 'desc' } } },
      });
    } catch (error) {
      handlePrismaError(error, 'нет такого ID');
    }
  }

  async findById(id: string) {
    try {
      return this.prismaService.plant.findUnique({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error, 'нет такого ID');
    }
  }

  async delete(id: string) {
    await this.findByIdWithEvents(id);
    return this.prismaService.plant.delete({ where: { id: id } });
  }
}
