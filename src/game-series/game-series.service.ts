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

  determineSeriesStatusFromGames(games: { status: Status }[]): Status {
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

  async getAllSeriesWithStatus() {
    const seriesList = await this.prisma.gameSeries.findMany({
      include: {
        games: {
          include: { stats: true },
        },
      },
    });

    const results = seriesList.map((series) => {
      const seriesStatus = this.determineSeriesStatusFromGames(series.games);
      return {
        ...series,
        seriesStatus,
      };
    });

    return results;
  }

  getAllSeriesBasic() {
    return this.prisma.gameSeries.findMany({
      select: {
        id: true,
        name: true,
        status: true,
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
