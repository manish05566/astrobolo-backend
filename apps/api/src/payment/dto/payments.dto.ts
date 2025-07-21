import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  IsUUID,
  Min,
  MaxLength,
} from "class-validator";
import { NotBlank } from "@xapads/nest/utils";

export class PaymentDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsUUID()
  astrologer_id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: "Amount must be at least 1" })
  amount: number;

  @IsString()
  @IsIn(["UPI", "CARD", "WALLET", "NETBANKING"], {
    message: "Method must be one of: UPI, CARD, WALLET, NETBANKING",
  })
  method: string;

  @IsString()
  @MaxLength(100, { message: "Transaction ID must not exceed 100 characters" })
  transaction_id: string;

  @IsOptional()
  @IsString()
  @IsIn(["success", "pending", "failed"], {
    message: "Status must be success, pending, or failed",
  })
  status?: string;

}
