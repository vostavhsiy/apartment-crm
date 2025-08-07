import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, MaxLength } from "class-validator";

export class CreateClientDto {
  @ApiProperty()
  @MaxLength(200)
  name!: string;

  @ApiProperty()
  @IsPhoneNumber("RU")
  phone!: string;

  @ApiProperty()
  @IsOptional()
  avatarUrl?: string;
}
