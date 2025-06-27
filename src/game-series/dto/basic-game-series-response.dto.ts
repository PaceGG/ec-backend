import { ApiProperty } from '@nestjs/swagger';

export class GameSeriesBasicDto {
  @ApiProperty({ example: 1, description: 'ID серии' })
  id!: number;

  @ApiProperty({ example: 'Epic Adventures', description: 'Название серии' })
  name!: string;
}
