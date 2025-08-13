import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GameSeriesService } from './game-series/game-series.service';
import { GameSeriesController } from './game-series/game-series.controller';
import { GameSeriesModule } from './game-series/game-series.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [PrismaModule, GameModule, GameSeriesModule, YoutubeModule],
  controllers: [AppController, GameSeriesController],
  providers: [AppService, GameSeriesService],
})
export class AppModule {}
