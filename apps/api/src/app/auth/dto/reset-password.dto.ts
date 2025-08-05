import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty()
  token!: string;

  @ApiProperty()
  @MinLength(6)
  password!: string;
}

export class SendResetPasswordEmailDto {
  @ApiProperty()
  @IsEmail()
  email!: string;
}
