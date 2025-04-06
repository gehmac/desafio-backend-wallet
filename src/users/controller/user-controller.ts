import { Controller } from '@nestjs/common';
import { UserService } from '../service/user-service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.usersService.getUserById(email);
  // }
}