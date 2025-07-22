import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  Length,
  IsIn,
  IsNumber,
} from "class-validator";
import { NotBlank } from "@xapads/nest/utils";

export class OnboardingDto {
  @NotBlank()
  @IsString()
  image: string;

  @NotBlank()
  @Length(1, 15)
  @IsString()
  title: string;

  @NotBlank()
  @Length(1, 100)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
