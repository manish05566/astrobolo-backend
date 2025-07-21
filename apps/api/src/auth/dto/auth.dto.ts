import { OtpTypeEnum } from "@xapads/constant";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  Max,
} from "class-validator";

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @IsString()
  age_group: string;
}

export class LogOutDto {
  @IsBoolean()
  @IsNotEmpty()
  isLogOut: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isAccountDelete: boolean;
}
export class BuyEnergyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  rawPrice: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  currencyCode: string;

  @IsString()
  @IsOptional()
  currencySymbol: string;

  @IsString()
  @IsOptional()
  purchaseID: string;

  @IsString()
  @IsNotEmpty()
  productID: string;

  @IsString()
  @IsOptional()
  transactionDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  verificationData: string;

  @IsString()
  @IsOptional()
  serverVerificationData: string;
}

export class SendOtpDto {
  @IsString({ message: "Mobile number must be a string" })
  @IsNotEmpty({ message: "Mobile number is required" })
  @Matches(/^[6-9][0-9]{9}$/, {
    message: "Mobile number must be a valid 10-digit number starting with 6-9",
  })
  mobile: string;
}


export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsNumber({}, { message: "OTP must be a number!" })
  @IsNotEmpty({ message: "OTP should not be empty!" })
  otp: number;

  @IsEnum(OtpTypeEnum)
  @IsNotEmpty()
  otpType: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  device: string;
}

export class LoginOTPDto {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsNumber({}, { message: "OTP must be a number!" })
  @IsNotEmpty({ message: "OTP should not be empty!" })
  otp: number;

}

export class updateDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
    message: "Name must contain only alphabets",
  })
  @Length(1, 20, { message: "Name must be a maximum of 20 characters long." })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  age_group: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, {
    message: "Please enter a valid number for 'Number of cigarettes'.",
  })
  @Max(999, {
    message: "Number of cigarettes must be a maximum of 3 digits long.",
  })
  number_of_cigarettes: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: "Please enter a valid number for 'Years of smoking'." })
  @Max(999, {
    message: "Year of smoking must be a maximum of 2 digits long.",
  })
  years_of_smoking: number;
}
