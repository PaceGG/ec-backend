import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GameStatsDto {
  @ApiProperty({ example: 120, description: 'Длительность игры в минутах' })
  duration!: number;

  @ApiProperty({ example: 5, description: 'Количество эпизодов' })
  episodesCount!: number;
}

export class BasicGameDto {
  @ApiProperty({ example: 10, description: 'ID игры' })
  id!: number;

  @ApiProperty({ example: 'Epic Quest', description: 'Название игры' })
  name!: string;

  @ApiPropertyOptional({ type: GameStatsDto, description: 'Статистика игры' })
  stats?: GameStatsDto | null;
}
