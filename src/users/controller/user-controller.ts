import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../service/user-service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.getUserById(email);
  }
}