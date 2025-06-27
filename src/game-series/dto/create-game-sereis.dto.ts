import { ApiProperty } from '@nestjs/swagger';

export class CreateGameSeriesDto {
  @ApiProperty({
    example: 'Grand Theft Auto',
    description: 'Название серии игр',
  })
  name!: string;

  @ApiProperty({
    example: [
      'Grand Theft Auto V',
      'Grand Theft Auto: San Andreas',
      'Grand Theft Auto: Vice City',
    ],
    description: 'Массив названий игр серии',
    type: [String],
  })
  gameNames!: string[];
}
