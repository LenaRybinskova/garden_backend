import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlantsModule } from './plants/plants.module';
import { PlantVarietyModule } from './plant-variety/plant-variety.module';
import { PhotoPackageModule } from './photo-package/photo-package.module';
import { SortModule } from './sort/sort.module';

@Module({
  imports: [PrismaModule, AuthModule, PlantsModule, PlantVarietyModule, PhotoPackageModule, SortModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
