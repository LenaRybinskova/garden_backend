import { Module } from '@nestjs/common';
import { SortService } from './sort.service';
import { SortController } from './sort.controller';

@Module({
  controllers: [SortController],
  providers: [SortService],
})
export class SortModule {}
