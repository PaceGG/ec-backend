import { ApiProperty } from '@nestjs/swagger';

export class GameStatsDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 120 })
  duration!: number;

  @ApiProperty({ example: 10 })
  episodesCount!: number;
}

export class ThemeDto {
  @ApiProperty({ example: 5 })
  id!: number;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  coverart!: string;

  @ApiProperty({ example: '#ffcc00' })
  color!: string;
}

export class ShowcaseDto {
  @ApiProperty({ example: 3 })
  id!: number;
}

export class GameDto {
  @ApiProperty({ example: 101 })
  id!: number;

  @ApiProperty({ example: 'Енот против Зомби' })
  name!: string;

  @ApiProperty({
    enum: ['none', 'inProgress', 'complete', 'bad', 'wait'],
    example: 'none',
  })
  status!: string;

  @ApiProperty({ nullable: true, example: 1 })
  gameSeriesId?: number | null;

  @ApiProperty({ type: () => ThemeDto, nullable: true })
  theme?: ThemeDto | null;

  @ApiProperty({ type: () => GameStatsDto, nullable: true })
  stats?: GameStatsDto | null;

  @ApiProperty({ type: () => ShowcaseDto, nullable: true })
  showcase?: ShowcaseDto | null;
}

export class CreateGameSeriesResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Приключения Енота' })
  name!: string;

  @ApiProperty({ type: [GameDto] })
  games!: GameDto[];
}
