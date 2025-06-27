import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 'b6H5o@example.com',
    description: 'Email пользователя',
  })
  email!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Имя пользователя',
    required: false,
  })
  name?: string;
}
