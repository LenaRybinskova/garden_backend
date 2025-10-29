import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from 'src/event/dto/CreateEvent.dto';
import { UpdateEventDTO } from 'src/event/dto/UpdateEvent.dto';
import { WeatherService } from 'src/weather/weather.service';
import { PhotoValidationService } from 'src/photo/photoValidation.service';

@Injectable()
export class EventService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly weatherService: WeatherService,
    private readonly photoValidationService: PhotoValidationService,
  ) {
  }

  async findAll() {
    return this.prismaService.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  //вытащ по ID Event конкретный event
  async findById(eventId: string) {
    return this.prismaService.event.findUnique({
      where: { id: eventId },
    });
  }

  async update(id: string, dto: UpdateEventDTO) {
    const existEvent = await this.prismaService.event.findUnique({
      where: { id: id },
    });

    if (existEvent) {
      return this.prismaService.event.update({
        where: { id: id },
        data: {
          workType: dto.workType ? dto.workType : existEvent.workType,
          description: dto.description
            ? dto.description
            : existEvent.description,
          photoBase64: dto.photoBase64
            ? dto.photoBase64
            : existEvent.photoBase64,
        },
      });
    } else {
      throw new NotFoundException('Событие с таким ID не найдено');
    }
  }

  //TODO надо предумотреть чтобы можно было исторические данные по погоде подтягивать
  async create(dto: CreateEventDTO & { plantId: string; userId: string }) {
    const dateTime = dto.dateTime || new Date().toISOString().split('T')[0];

    const weather =
      (await this.weatherService.isWeatherExistsForDate(dateTime)) ||
      (await this.weatherService.getWeather());

    //проверяем, что фото то точно фото и размер
    let validPhotoBase64: string | undefined;
    if (dto.photoBase64) {
      validPhotoBase64 = await this.photoValidationService.validatePhoto(dto.photoBase64);
    }

    // Создаём событие
    return this.prismaService.event.create({
      data: {
        dateTime: dateTime,
        workType: dto.workType,
        moonPhase: dto.moonPhase,
        description: dto.description,
        photoBase64: validPhotoBase64,
        plantId: dto.plantId,
        userId: dto.userId,
        weatherId: weather.id,
      },
    });
  }

  async delete(id: string) {
    try {
      await this.prismaService.event.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error && error.code === 'P2025') {
        throw new NotFoundException('Событие с таким ID не найдено');
      }
      throw error;
    }
  }
}
