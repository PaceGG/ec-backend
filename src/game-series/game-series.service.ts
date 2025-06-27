import { Body, Injectable } from '@nestjs/common';
import { GameSeries, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameSeriesService {
  constructor(private prisma: PrismaService) {}

  private statusPriority: Status[] = [
    Status.inProgress,
    Status.none,
    Status.complete,
    Status.wait,
    Status.bad,
  ];

  async determineSeriesStatus(seriesId: number): Promise<Status> {
    const games = await this.prisma.game.findMany({
      where: {
        gameSeriesId: seriesId,
      },
      select: {
        status: true,
      },
    });

    if (games.length === 0) {
      return Status.none;
    }

    const statuses = new Set(games.map((g) => g.status));

    for (const status of this.statusPriority) {
      if (statuses.has(status)) {
        return status;
      }
    }

    return Status.none;
  }

  getAllSeries() {
    return this.prisma.gameSeries.findMany({
      include: {
        games: {
          include: {
            stats: true,
          },
        },
      },
    });
  }

  getAllSeriesBasic() {
    return this.prisma.gameSeries.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
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
