import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class UserValidPipe implements PipeTransform {

  async transform(value: any, { metatype }: ArgumentMetadata) {

    // metatype为原生类型时不做验证
    if (!value || !this.toValidate(metatype)) return value;

    // 验证接收到的参数格式和类型是否正确
    const errors = await validate(plainToClass(metatype, value));
    console.log(errors);
    if (errors.length > 0) {
      throw new BadRequestException(errors[0].constraints);
    }
    return value;
  }

  // 用于验证metatype是否是原生类型
  private toValidate(metatype): boolean {
    const ignoreTypes = [String, Boolean, Number, Array, Object];
    return !ignoreTypes.find((type) => type === metatype);
  }
}

export class ParseIntPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('id must be a number')
    }
    return val;
  }
}
