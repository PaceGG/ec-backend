import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameSeries } from '@prisma/client';
import { CreateGameSeries } from './dto/game-sereis.dto';

@ApiTags('Серия игр')
@Controller('game-series')
export class GameSeriesController {
  constructor(private readonly service: GameSeriesController) {}

  @Post()
  @ApiOperation({ summary: 'Создание серии игр' })
  @ApiResponse({
    status: 200,
    description: 'Серия игр',
    type: CreateGameSeries,
  })
  createWithGames(
    @Body() data: { name: string; games: { name: string }[] },
  ): Promise<GameSeries> {
    return this.service.createWithGames(data);
  }
}
