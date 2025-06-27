import { Module } from '@nestjs/common';
import { GameSeriesService } from './game-series.service';
import { GameSeriesController } from './game-series.controller';

@Module({
  providers: [GameSeriesService],
  controllers: [GameSeriesController],
})
export class GameSeriesModule {}
