import { IsString, IsNotEmpty, Length } from "class-validator";

export class ClientUserDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Length(8)
  readonly password: string;
}

export class DataUserDto extends ClientUserDto {
  readonly id: number
}