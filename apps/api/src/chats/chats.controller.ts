import {
  Controller,
  Post,
  Body,
  Req,
  Patch,
  Get,
  Param,
  Query,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ChatService } from "./chats.service";
import { ChatDto, ChatTransactionDto } from "./dto/chats.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";
import * as fs from 'fs';

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}


@Get('conversations')
@UseGuards(JwtAuthGuard)
async fetchConversation(
  @Query('userId') userId: string,
  @Query('astrologerId') astrologerId: string,
) {

  console.log('hererere conversation')
  return this.chatService.fetchConversationList(userId, astrologerId);
}


 @Get("messages")
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @Query("senderId") senderId: string,
    @Query("receiverId") receiverId: string
  ) {

    console.log('fetch chat conversation');
    return this.chatService.getMessagesBetweenUsers(senderId, receiverId);
  }

  @Get("unread-count/:receiverId")
  @UseGuards(JwtAuthGuard)
  getUnreadCount(@Param("receiverId") receiverId: string) {
    return this.chatService.getUnreadCount(receiverId);
  }


@Get(':userId')
@UseGuards(JwtAuthGuard)
async getConversation(@Param('userId') userId: string) {
  return this.chatService.getConversationList(userId);
}



  @Post("upload-image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/chats",
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    })
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { status: false, message: "No file uploaded" };
    }
    return {
      status: true,
      message: "Image uploaded successfully",
      url: `/uploads/chats/${file.filename}`, // ✅ accessible due to static serve in `main.ts`
    };
  }

 

  @Patch("mark-read/:customerId")
  @UseGuards(JwtAuthGuard)
  async markAsRead(@Param("customerId") customerId: string, @Req() req) {
    const astrologerId = req.user.id;
    return this.chatService.markMessagesAsRead(customerId, astrologerId);
  }

  @Post("/")
  @UseGuards(JwtAuthGuard)
  async create(@Body() postData: ChatDto) {
    return await this.chatService.create(postData);
  }

  @Post("chat_transation")
  @UseGuards(JwtAuthGuard)
  async chat_transaction_create(@Body() postData: ChatTransactionDto) {
    return await this.chatService.chat_transaction_create(postData);
  }
}
