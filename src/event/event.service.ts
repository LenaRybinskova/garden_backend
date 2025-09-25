import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from 'src/event/dto/CreateEvent.dto';
import { UpdateEventDTO } from 'src/event/dto/UpdateEvent.dto';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly weatherService: WeatherService,
  ) {}

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
    console.log('update event:', existEvent);

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
    const today = new Date().toISOString().split('T')[0]; // "2025-07-07"

    let weather;

    weather = await this.prismaService.weather.findUnique({
      where: { dateTime: dto.dateTime },
    });

    if (!weather) {
      weather = await this.weatherService.getWeather();
    }
    console.log('weather', weather);

    // Создаём событие
    return this.prismaService.event.create({
      data: {
        dateTime: dto.dateTime,
        workType: dto.workType,
        moonPhase: dto.moonPhase,
        description: dto.description,
        photoBase64: dto.photoBase64,
        plantId: dto.plantId,
        userId: dto.userId,
        /*        weatherId: weather != null ? weather.id : null,*/
        weatherId: weather.id,
      },
    });
  }

  /*async create(dto: CreateEventDTO & { plantId: string; userId: string }) {
      const today = new Date().toISOString().split('T')[0]; // "2025-07-07"

      let weather;
      if (dto.dateTime === today) {
        console.log("dto.dateTime === today", dto.dateTime === today)
        //ищем запись о Погоде на сегдня
        weather = await this.prismaService.weather.findUnique({
          where: { dateTime: today },
        });

        // Если не нашли — создаём новую
        if (!weather) {
          console.log("!weather")
          weather = await this.prismaService.weather.create({
            data: {
              dateTime: today,
            },
          });
          console.log()
        }
      } else {
        // надо в Погоде искать погоду на дату на которую я создаю Евент( для случаев, когда я задним числом создаю евент и должна подвязать Погоду)
        weather = this.prismaService.weather.findUnique({
          where: { dateTime: dto.dateTime },
        })
      }


      // Создаём событие
      return this.prismaService.event.create({
        data: {
          dateTime: dto.dateTime,
          workType: dto.workType,
          moonPhase: dto.moonPhase,
          description: dto.description,
          photoBase64: dto.photoBase64,
          plantId: dto.plantId,
          userId: dto.userId,
          weatherId: weather.id ,
        },
      });
    }*/

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
