import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, GameSeries, Prisma } from '@prisma/client';
import { GameUpdateDto } from './dto/game.dto';

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
    games: Game[];
  }> {
    const gameSeries = await this.prisma.gameSeries.findMany({
      include: {
        games: {
          include: { stats: true },
        },
      },
    });

    const games = await this.prisma.game.findMany({
      include: {
        stats: true,
      },
    });

    return {
      gameSeries,
      games,
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

  async updateGame(id: number, dto: GameUpdateDto) {
    const data: Prisma.GameUpdateInput = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;

    if (dto.stats) {
      data.stats = {
        upsert: {
          update: {
            duration: dto.stats.duration,
            episodesCount: dto.stats.episodesCount,
          },
          create: {
            duration: dto.stats.duration,
            episodesCount: dto.stats.episodesCount,
          },
        },
      };
    }

    return this.prisma.game.update({
      where: { id },
      data,
      include: { stats: true },
    });
  }
}
