import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlantsModule } from './plants/plants.module';
import { PlantVarietyModule } from './plant-variety/plant-variety.module';
import { PhotoPackageModule } from './photo-package/photo-package.module';

@Module({
  imports: [PrismaModule, AuthModule, PlantsModule, PlantVarietyModule, PhotoPackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
