import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, GameSeries } from '@prisma/client';

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

  async getAllGamesWithSeries(): Promise<{
    gameSeries: GameSeries[];
    soloGames: Game[];
  }> {
    const gameSeries = await this.prisma.gameSeries.findMany({
      include: {
        games: true,
      },
    });

    const soloGames = await this.prisma.game.findMany({
      where: {
        gameSeriesId: null,
      },
    });

    return {
      gameSeries,
      soloGames,
    };
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

  getGamesBySeriesId(id: number) {
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

  getGameById(id: number): Promise<Game | null> {
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
