import { Body, Injectable } from '@nestjs/common';
import { GameSeries } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameSeriesService {
  constructor(private prisma: PrismaService) {}

  getAllGameSeries() {
    return this.prisma.gameSeries.findMany();
  }

  createWithGames(data: {
    name: string;
    gameNames: string[];
  }): Promise<GameSeries> {
    return this.prisma.gameSeries.create({
      data: {
        name: data.name,
        games: {
          create: data.gameNames.map((name) => ({ name })),
        },
      },
      include: {
        games: true,
      },
    });
  }
}
