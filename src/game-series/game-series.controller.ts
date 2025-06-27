import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameSeries } from '@prisma/client';
import { GameSeriesService } from './game-series.service';
import { CreateGameSeriesDto } from './dto/create-game-sereis.dto';
import { CreateGameSeriesResponseDto } from './dto/create-game-sereis-response.dto';
import { GameSeriesBasicDto } from './dto/basic-game-series-response.dto';

@ApiTags('Game Series')
@Controller('game-series')
export class GameSeriesController {
  constructor(private readonly service: GameSeriesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание серии игр' })
  @ApiBody({
    type: CreateGameSeriesDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Серия игр',
    type: CreateGameSeriesResponseDto,
  })
  createWithGames(
    @Body() data: { name: string; gameNames: string[] },
  ): Promise<GameSeries> {
    return this.service.createWithGames(data);
  }

  @Get()
  getAllSeries(): Promise<GameSeries[]> {
    return this.service.getAllSeries();
  }

  @Get('basic')
  @ApiOperation({
    summary: 'Получение списка серий без вложенных игр',
    description: 'Возвращает базовый список серий без вложенных игр',
  })
  @ApiResponse({
    status: 200,
    description: 'Массив игровых серий',
    type: [GameSeriesBasicDto],
  })
  getAllSeriesBasic(): Promise<GameSeries[]> {
    return this.service.getAllSeriesBasic();
  }
}
