import { ApiProperty } from '@nestjs/swagger';

export class CreateGameSeries {
  @ApiProperty({
    example: 'Grand Theft Auto',
    description: 'Название игровой серии',
  })
  name!: string;

  @ApiProperty({
    example: [
      { name: 'Grand Theft Auto V' },
      { name: 'Grand Theft Auto: San Andreas' },
      { name: 'Grand Theft Auto: Vice City' },
    ],
    description: 'Список игр',
  })
  games!: { name: string }[];
}
