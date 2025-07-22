import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
  Matches,
  IsEmail,
  Length,
  Min,
  Max,
  IsIn,
  IsNumber,
} from "class-validator";
import { NotBlank } from "@xapads/nest/utils";

export class VendorDto {
  @NotBlank()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
    message: "First Name must contain only alphabets",
  })
  first_name: string;

  @NotBlank()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
    message: "Last Name must contain only alphabets",
  })
  last_name: string;

  @IsEmail({}, { message: "Please sign-in with a valid email id!" })
  @IsString({ message: "Email must be a string" })
  @IsNotEmpty({ message: "Email is required" })
  @Length(1, 30, { message: "Email must be a maximum of 30 characters long." })
  @Matches(/^[^!#$%&*'=?_|~{}]*$/, {
    message: "Email should not contain special characters like !#$%&*'=?_|~{}.",
  })
  email: string;

  @NotBlank()
  @IsString()
  birth_date: string;

  @NotBlank()
  @IsString()
  @IsIn(["MALE", "FEMALE", "OTHER"], {
    message: "Gender must be either MALE, FEMALE, or OTHER",
  })
  gender: string;

  @IsString()
  country: string;

  @NotBlank()
  @IsString()
  city: string;

  @NotBlank()
  @IsString()
  state: string;

  @NotBlank()
  @IsString()
  marital_status: string;

  @NotBlank()
  @IsString()
  religion: string;

  @NotBlank()
  @IsString()
  language: string;

  @IsString()
  specialist: string;

  @IsString()
  experience: string;

  @IsNumber()
  chat_charge: number;

  @IsNumber()
  call_charge: number;

  @IsString()
  address: string;

  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(100000, { message: "Pincode must be a 6-digit number" })
  @Max(999999, { message: "Pincode must be a 6-digit number" })
  pincode: number;
}


export class UploadProfileDto {
  @IsNotEmpty()
  @IsUUID()
  userid: string;

 
}
