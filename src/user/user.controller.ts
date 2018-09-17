import {
  Get,
  Post,
  Controller,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseFilters,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from "./user.service";
import { ClientUserDto } from "./user.dto";
import { HttpExceptionFilterFilter } from "filter/http-exception-filter";
import { MultiHttpExceptionFilterFilter } from "filter/multi-http-exception-filter";
import { UserValidPipe, ParseIntPipe } from "./user.pipe";

@Controller('user')
// @UseFilters(HttpExceptionFilterFilter) 这里使用可以覆盖整个controller
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
  async getUserById(@Param('id', new ParseIntPipe()) id) {
    const user = await this.userService.getUser(+id);
    return user;
  }

  @Post()
  async createAccount(@Body(new ValidationPipe({
    transform: true,
    validationError: {
      target: false,
      value: false
    }
  })) { name, password }: ClientUserDto) {
    return this.userService.createUser({
      name,
      password
    });
  }
}
