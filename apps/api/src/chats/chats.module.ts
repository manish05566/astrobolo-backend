import { Module } from "@nestjs/common";
import { ChatService } from "./chats.service";
import { ChatController } from "./chats.controller";
import { ChatGateway } from "./chat.gateway"; // import gateway

import { UserModule } from "../users/users.module";

@Module({
  imports: [UserModule],        // 👈 use the correct name
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
