import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsNumber,
  MaxLength,
  Min,
} from "class-validator";

export class ChatDto {
  @IsUUID()
  @IsNotEmpty({ message: "Sender ID is required" })
  sender_id: string;

  @IsUUID()
  @IsNotEmpty({ message: "Receiver ID is required" })
  receiver_id: string;

  @IsString()
  @IsNotEmpty({ message: "Message cannot be empty" })
  message: string;

  @IsOptional()
  @IsString()
  @IsIn(["text", "image", "audio"], {
    message: "Message type must be one of: text, image, audio",
  })
  message_type?: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}



export class ChatTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  astrologer_id: string;

  @IsOptional()
  @IsUUID()
  chat_id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: "Amount deducted must be greater than 0" })
  total_charge: number;

   @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: "Amount deducted must be greater than 0" })
  duration_minutes: number;

  @IsOptional()
  @IsString()
  @IsIn(["chat", "call", "video"], {
    message: "Type must be one of: chat, call, video",
  })
  type?: string;

  @IsOptional()
  @IsString()
  @IsIn(["completed", "pending", "failed"], {
    message: "Status must be one of: completed, pending, failed",
  })
  status?: string;
}
