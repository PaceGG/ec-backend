import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Одинокий Енот' })
  name!: string;
}
