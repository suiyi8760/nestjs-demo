import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NormalMidMiddleware } from "middleware/normal-mid/normal-mid.middleware";
import { ParamMidMiddleware } from "middleware/param-mid/param-mid.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NormalMidMiddleware, ParamMidMiddleware)
      .with('Middleware Params')
      .forRoutes('/user'); //.forRoutes(UserController) also OK
  }
}
