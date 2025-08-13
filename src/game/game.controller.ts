import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Game, GameSeries } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameResponseDto } from './dto/create-game-response.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { BasicGameDto, GameUpdateDto } from './dto/game.dto';
import { GameDto } from 'src/game-series/dto/create-game-sereis-response.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  @ApiOperation({ summary: 'Создать игру без привязки к серии (одиночная)' })
  @ApiResponse({
    status: 201,
    description: 'Успешное создание игры',
    type: GameResponseDto,
  })
  @ApiBody({ type: CreateGameDto })
  create(@Body() data: { name: string }): Promise<Game> {
    return this.service.create(data);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Получить все серии и игры)',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение серий и игр',
  })
  async getAllSeriesAndGames(): Promise<{
    gameSeries: GameSeries[];
    games: Game[];
  }> {
    return this.service.getAllGamesWithSeries();
  }

  @Get('without-series')
  @ApiOperation({
    summary: 'Получить все игры без серии (одиночные)',
    description:
      'Возвращает все игры, у которых поле seriesId = null, включая статистику',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение игр без серии',
    type: [BasicGameDto],
  })
  getGamesWithoutSeries(): Promise<Game[]> {
    return this.service.getGamesWithoutSeries();
  }

  @Get('by-series/:sereiesId')
  @ApiOperation({
    summary: 'Получить все игры, привязанные к серии',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение игр без серии',
    type: [BasicGameDto],
  })
  getGamesBySeriesId(@Param('seriesId') seriesId: string) {
    const id = Number(seriesId);
    return this.service.getGamesBySeriesId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить игру (без служебных полей)' })
  @ApiParam({ name: 'id', example: 1, description: 'ID игры' })
  @ApiResponse({
    status: 200,
    description: 'Игра успешно обновлена',
    type: GameDto,
  })
  updateGame(@Param('id') id: string, @Body() dto: GameUpdateDto) {
    return this.service.updateGame(Number(id), dto);
  }
}
