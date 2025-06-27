import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user.dto';
import { User } from './dto/user.dto';

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Пользователи успешно получены',
    type: [User],
  })
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    type: CreateUser,
  })
  createUser(@Body() body: { email: string; name?: string }) {
    return this.userService.createUser(body.email, body.name);
  }
}
