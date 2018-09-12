import { Get, Post, Controller, Req, Query, Param, Body } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers() {
    const allUsers = await this.userService.getAllUsers();
    return allUsers;
  }

  @Get('/:id')
  async getUserById(@Param() { id }) {
    const user = await this.userService.getUser(+id);
    return user;
  }

  @Post()
  async createAccount(@Body() { name, password }: UserDto) {
    const id = await this.userService.getNewUserId();
    return this.userService.createUser({
      id,
      name,
      password
    });
  }
}
