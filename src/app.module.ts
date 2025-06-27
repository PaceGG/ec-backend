import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GameSeriesService } from './game-series/game-series.service';
import { GameSeriesController } from './game-series/game-series.controller';

@Module({
  imports: [PrismaModule, GameModule],
  controllers: [AppController, GameSeriesController],
  providers: [AppService, GameSeriesService],
})
export class AppModule {}
