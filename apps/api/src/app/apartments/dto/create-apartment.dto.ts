import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateApartmentDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(200)
  subtitle?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(200)
  price?: string;

  @ApiProperty()
  @IsOptional()
  features?: Prisma.FeatureCreateInput[];

  @ApiProperty()
  @IsOptional()
  files?: Express.Multer.File[];
}
