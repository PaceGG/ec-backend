import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  getAllGames(): Promise<Game[]> {
    return this.prisma.game.findMany({
      include: {
        gameSeries: true,
        theme: true,
        stats: true,
        showcase: true,
      },
    });
  }

  getGamesWithoutSeries(): Promise<Game[]> {
    return this.prisma.game.findMany({
      where: {
        gameSeriesId: null,
      },
      include: {
        stats: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  getGamesBySeriesId(id: bigint) {
    return this.prisma.game.findMany({
      where: {
        gameSeriesId: id,
      },
      include: {
        stats: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  getGameById(id: bigint): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: { id },
      include: {
        gameSeries: true,
        theme: true,
        stats: true,
        showcase: true,
      },
    });
  }

  create(data: { name: string }): Promise<Game> {
    return this.prisma.game.create({
      data: {
        name: data.name,
      },
    });
  }
}
