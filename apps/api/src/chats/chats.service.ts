import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { Op, fn, col, Sequelize } from 'sequelize';
import { ChatDto, ChatTransactionDto } from "./dto/chats.dto";
import moment = require("moment");
import { Chat, ChatTransaction, Vendor } from "@xapads/nest/models";
import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}

  // In chat.service.ts
async getConversationList(userId: string) {
  try {
    const { count, rows } = await ChatTransaction.findAndCountAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Vendor,
          as: "astrologer",
          attributes: ["id", "first_name", "image", "chat_charge","admin_chat_charge"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!rows || rows.length === 0) {
      return AppResponse.failed({
        message: AppResponse.messages.recordNotFound,
        data: {},
      });
    }

    return AppResponse.success({
      message: "Fetched conversation list",
      data: rows,
      totalCount: count,
    });

  } catch (error) {
    return AppResponse.failed({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
}

// async getConversationList(userId: string) {
//   try {
//     const rows = await ChatTransaction.findAll({
//       where: { user_id: userId },
//       attributes: [
//         'user_id',
//         'astrologer_id',
//         'chat_id',
//         [fn('SUM', col('duration_minutes')), 'duration_minutes'],
//         [fn('SUM', col('total_charge')), 'total_charge'],
//         [fn('MAX', col('createdAt')), 'createdAt'], // get latest createdAt
//       ],
//       include: [
//         {
//           model: Vendor,
//           as: "astrologer",
//           attributes: ["id", "first_name", "image", "chat_charge"],
//         },
//       ],
//       group: ['user_id', 'astrologer_id', 'chat_id', 'astrologer.id'],
//       order: [[fn('MAX', col('createdAt')), 'DESC']],
//       raw: false,
//     });

//     if (!rows || rows.length === 0) {
//       return AppResponse.failed({
//         message: AppResponse.messages.recordNotFound,
//         data: {},
//       });
//     }

//     console.log('rowwwww', rows)

//     return AppResponse.success({
//       message: "Fetched conversation list",
//       data: rows,
//       totalCount: rows.length,
//     });

//   } catch (error) {
//     return AppResponse.failed({
//       message: error.message || "Something went wrong",
//       data: {},
//     });
//   }
// }

async fetchConversationList(userId: string, astrologerId: string) {

  console.log('userId', userId)
  console.log('astrologerId', astrologerId)
  try {
    const messages = await Chat.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id: astrologerId },
          { sender_id: astrologerId, receiver_id: userId },
        ],
      },
      include: [
        {
          model: Vendor,
          as: "astrologer",
          attributes: ["id", "first_name", "image", "chat_charge", "admin_chat_charge"],
        },
        {
          model: ChatTransaction,
          attributes: ["duration_minutes"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    const modifiedMessages = messages.map((msg: any) => {
      const baseCharge = msg.astrologer?.chat_charge || 0;
      const adminCharge = msg.astrologer?.admin_chat_charge || 0;
      const totalCharge = baseCharge + (baseCharge * adminCharge) / 100;

      return {
        ...msg.toJSON(),
        total_charge: totalCharge,
      };
    });

    return AppResponse.success({
      message: "Fetched conversation list",
      data: modifiedMessages,
    });
  } catch (error) {
    return AppResponse.failed({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
}





  async getMessagesBetweenUsers(senderId: string, receiverId: string) {
    try {

      console.log('senderIdsenderId', senderId)
      console.log('receiverIdreceiverId', receiverId)
      const getMessage = await Chat.findAll({
        where: {
          // Either senderId to receiverId or vice versa
          [Op.or]: [
            { sender_id: senderId, receiver_id: receiverId },
            { sender_id: receiverId, receiver_id: senderId },
          ],
        },
        order: [["createdAt", "ASC"]], // You may want to order by time
      });

      if (!getMessage) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: getMessage,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async getUnreadCount(receiver_id: string) {
    try {
      // Total unread messages
      const count = await Chat.count({
        where: { receiver_id, is_read: false },
      });

      // Get unique customer_ids who sent unread messages
      const unreadSenders = await Chat.findAll({
        attributes: ["sender_id"],
        where: { receiver_id, is_read: false },
        group: ["sender_id"],
      });

      const uniqueCustomerIds = unreadSenders.map((msg) => msg.sender_id);

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: {
          unreadCount: count,
          customerIds: uniqueCustomerIds,
        },
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async markMessagesAsRead(customerId: string, astrologerId: string) {
  const result = await Chat.update(
    { is_read: true },
    {
      where: {
        sender_id: customerId,
        receiver_id: astrologerId,
        is_read: false,
      },
    }
  );
  return {
    status: true,
    message: 'Messages marked as read',
    data: result,
  };
}


  async create(data: ChatDto) {
    try {
      const newChat = await Chat.create({
        ...data,
      });

      if (!newChat) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: newChat,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async chat_transaction_create(data: ChatTransactionDto) {
    try {
      console.log('data', data)
      const newChat = await ChatTransaction.create({
        ...data,
      });

      if (!newChat) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: newChat,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }
}
