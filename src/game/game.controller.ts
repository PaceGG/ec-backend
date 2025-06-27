import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameResponseDto } from './dto/create-game-response.dto';
import { CreateGameDto } from './dto/create-game.dto';

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
}
