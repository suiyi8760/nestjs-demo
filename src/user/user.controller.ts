import {
  Get,
  Post,
  Controller,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseFilters
} from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { HttpExceptionFilterFilter } from "filter/http-exception-filter";
import { MultiHttpExceptionFilterFilter } from "filter/multi-http-exception-filter";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers() {
    const allUsers = await this.userService.getAllUsers();
    return allUsers;
  }

  // 测试HttpException
  @Get('/403')
  //@UseFilters(HttpExceptionFilterFilter) //该过滤器里只catchUnauthorizedException 所以在该请求里不会生效
  @UseFilters(HttpExceptionFilterFilter, MultiHttpExceptionFilterFilter)
  forbiddenErr() {
    throw new HttpException('Access Denied(You don\'t have premission)', HttpStatus.FORBIDDEN);
    // same to
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, 403);
    // throw Error('error') //return 500
  }

  @Get('unauthorize')
  @UseFilters(HttpExceptionFilterFilter)
  unAuthorErr() {
    throw new UnauthorizedException();
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
