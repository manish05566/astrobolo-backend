import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chats.service";
import { UserService } from "../users/users.service";
import { ChatDto } from "./dto/chats.dto";



// 👇 Add this before the @WebSocketGateway decorator
const activeRequests: Map<string, Set<string>> = new Map();
const pendingRequests: Map<string, Set<string>> = new Map(); // astrologerId → customerIds
const activeChats: Set<string> = new Set(); // astrologerIds currently in chat


@WebSocketGateway({
  cors: {
    origin: "*", // or your frontend URL
    credentials: true,
  },
  transports: ["websocket"],
  pingInterval: 25000,
  pingTimeout: 60000,
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService, private readonly UserService: UserService, ) {}
  
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      console.warn(`Connection rejected - no userId. Socket ID: ${client.id}`);
    client.disconnect();
    return;
    } else {
      client.join(userId);
      console.log(`Client connected: ${client.id} with ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join_room")
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    console.log("✅ Backend joined room:", roomId);

    client.join(roomId);
    console.log(`Socket ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody() payload: { message: ChatDto; roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { message, roomId } = payload;
    console.log("Saving message:", message);
    const result = await this.chatService.create(message);
    console.log("Result from DB:", result);

    if (result.data) {
      console.log("Emitting message to room:", roomId, result.data);
      this.server.to(roomId).emit("receiveMessage", result.data);
    }

    return { status: "ok" };
  }

  @SubscribeMessage("end_chat_by_customer")
handleEndChatByCustomer(
  @MessageBody() data: { senderId: string; receiverId: string; roomId: string }
) {
  console.log("📴 Chat ended by customer:", data);

  // 1️⃣ Remove astrologer from active chat
  activeChats.delete(data.receiverId);

  // 2️⃣ Remove sender from pending list (cleanup)
  const requests = pendingRequests.get(data.receiverId);
  if (requests) {
    requests.delete(data.senderId);
    pendingRequests.set(data.receiverId, requests);
  }

  // 3️⃣ Notify astrologer
  this.server.to(data.receiverId).emit("chat_ended_by_customer", data);

  // 4️⃣ Send next request if any
  const remaining = pendingRequests.get(data.receiverId);
  if (remaining && remaining.size > 0) {
    const nextSenderId = [...remaining][0]; // pick first

    this.UserService.findById(nextSenderId).then((customer) => {
      const enriched = {
        senderId: nextSenderId,
        receiverId: data.receiverId,
        roomId: [nextSenderId, data.receiverId].sort().join("-"),
        customerName: customer?.first_name || "Unknown",
        customerImage: customer?.image || null,
      };
      this.server.to(data.receiverId).emit("request_chat", enriched);
    });
  }
}





@SubscribeMessage('request_chat')
async handleRequestChat(
  @MessageBody() data: { senderId: string; receiverId: string; roomId: string },
  @ConnectedSocket() client: Socket,
) {
  const { senderId, receiverId } = data;

  // Reject if astrologer already has 2 pending requests
  const requests = pendingRequests.get(receiverId) || new Set();
  if (requests.size >= 2) {
    this.server.to(senderId).emit('chat_busy', {
      message: 'Astrologer is currently busy with other customers.',
    });
    return;
  }

  // Add to pending list
  requests.add(senderId);
  pendingRequests.set(receiverId, requests);

  // Enrich and send to astrologer
  const customer = await this.UserService.findById(senderId);
  const enriched = {
    ...data,
    customerName : customer?.first_name || "Unknown",
    customerImage: customer?.image || null,
  };

  this.server.to(receiverId).emit('request_chat', enriched);
}


@SubscribeMessage('accept_chat')
async handleAcceptChat(
  @MessageBody() data: { senderId: string; receiverId: string; roomId: string },
  @ConnectedSocket() client: Socket,
) {
  // Check if astrologer is already chatting
  if (activeChats.has(data.receiverId)) {
    this.server.to(data.senderId).emit('chat_busy', {
      message: 'Astrologer is already in an active chat.',
    });
    return;
  }

  client.join(data.roomId);
  activeChats.add(data.receiverId); // Set as active

  this.server.to(data.senderId).emit('chat_accepted', data);

  const customer = await this.UserService.findById(data.senderId);

  const detailsText = [
    `Hi ${customer?.first_name || 'there'},`,
    'Below are my details:',
    `Name: ${customer?.first_name || '-'}`,
    `Gender: ${customer?.gender || '-'}`,
    `DOB: ${customer?.birth_date || '-'}`,
    `TOB: ${customer?.birth_time || '-'}`,
    `POB: ${customer?.birth_place || '-'}`,
    `Marital Status: ${customer?.marital_status || '-'}`,
    `Phone: ${customer?.mobile || '-'}`,
    `Email: ${customer?.email || '-'}`,
    `Address: ${[customer?.birth_place, customer?.city, customer?.state, customer?.country].filter(Boolean).join(', ') || '-'}`,
  ].join('\n');

  const detailsMsg: ChatDto = {
    sender_id:   data.senderId,
    receiver_id: data.receiverId,
    message:     detailsText,
    message_type:'text',
    is_read:     false,
  };

  const welcomeMsg: ChatDto = {
    sender_id:    data.receiverId,
    receiver_id:  data.senderId,
    message:      'Welcome! How can I help you today? 😊',
    message_type:'text',
    is_read:      false,
  };

  await this.chatService.create(detailsMsg);
  await this.chatService.create(welcomeMsg);

  console.log("✅ [Gateway] Sending initialMessages to room:", data.roomId);
  this.server.to(data.roomId).emit("initialMessages", [detailsMsg, welcomeMsg]);
  console.log("✅ [Gateway] Sent:", [detailsMsg, welcomeMsg]);


  // Remove from pending
  const requests = pendingRequests.get(data.receiverId);
  if (requests) {
    requests.delete(data.senderId);
    pendingRequests.set(data.receiverId, requests);
  }
}




@SubscribeMessage("reject_chat")
handleRejectChat(
  @MessageBody() data: { senderId: string; receiverId: string }
) {
  console.log(`❌ Chat rejected by astrologer (${data.receiverId})`);
  this.server.to(data.senderId).emit("chat_rejected");
}


/* ------------------------------------------------------------------ */
/*  NEW: relay customer_ready so the astrologer knows the client is in */
/* ------------------------------------------------------------------ */
@SubscribeMessage("customer_ready")
handleCustomerReady(
  @MessageBody()
  data: { roomId: string; customerId: string; astrologerId: string },
) {
  console.log("[GATEWAY] customer_ready relay → astrologer", data);

  // send straight to the astrologer’s personal room
  this.server
    .to(data.astrologerId)
    .emit("customer_ready", { customerId: data.customerId });
}


@SubscribeMessage('cancel_chat_request')
handleCancelChatRequest(
  @MessageBody() data: { senderId: string; receiverId: string; roomId: string }
) {
  // remove from pending map
  const reqSet = pendingRequests.get(data.receiverId);
  if (reqSet) {
    reqSet.delete(data.senderId);
    pendingRequests.set(data.receiverId, reqSet);
  }
  // notify astrologer UI to drop it
  this.server.to(data.receiverId).emit('cancel_chat_request', data);
}










}
