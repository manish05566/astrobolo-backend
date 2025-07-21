import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { PaymentDto} from "./dto/payments.dto";
import moment = require("moment");
import { RechargePayment, ChatTransaction , Vendor} from "@xapads/nest/models";
import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaymentService {
  constructor(private configService: ConfigService) {}

  async listing(filters: {
    skip: number;
    limit: number;
    sort: string;
    ord: "asc" | "desc";
  }) {
    try {
      const { skip, limit, sort, ord } = filters;
      const whereCondition: any = {};

      whereCondition.is_active = true;

      const userList = await RechargePayment.findAll({
        offset: skip,
        limit,
        order: [[sort, ord]],
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active"],
        },
      });

      if (userList && userList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: userList,
        });
      } else {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }

  async show(user_id: string) {
    try {
      const userPayment = await RechargePayment.findOne({
        where: { user_id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!userPayment) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: {
          user_id,
          amount: userPayment.amount,
        },
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async create(data: PaymentDto) {
    try {
      const newPayment = await RechargePayment.create({
        ...data,
      });

      if (!newPayment) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: newPayment,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

   async updateBalance(userId: string, deductedAmount: number) {
  try {
    const payment = await RechargePayment.findOne({ where: { user_id: userId } });

    if (!payment) {
      return AppResponse.failed({
        message: AppResponse.messages.recordNotFound,
        data: {},
      });
    }

    const newAmount = payment.amount - deductedAmount;

    payment.amount = newAmount;
    await payment.save();

    return AppResponse.success({
      message: "Balance updated successfully",
      data: payment,
    });
  } catch (error) {
    return AppResponse.failed({
      message: error.message,
      data: {},
    });
  }
}


async walletTransaction(userId: string) {
  try {
    // Get current balance from RechargePayment
    const payment = await RechargePayment.findOne({ where: { user_id: userId } });

    // Get transaction history from ChatTransaction
    const transactions = await ChatTransaction.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']], // Optional: recent first
    });

    if (!payment) {
      return AppResponse.failed({
        message: AppResponse.messages.recordNotFound,
        data: {},
      });
    }

    // Transform transactions if needed
    const formattedTransactions = transactions.map((txn) => ({
      minuts: txn.duration_minutes || null,
      amount: txn.total_charge,
      datetime: txn.createdAt,
    }));

    return AppResponse.success({
      message: "Wallet data fetched successfully",
      data: {
        balance: payment.amount,
        transactions: formattedTransactions,
      },
    });
  } catch (error) {
    return AppResponse.failed({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
}

    async astrologerWalletTransaction(userId: string) {
  try {
    console.log('userId', userId);

    // 1. Get admin percentage from vendor table (assuming it's in percent like 20 for 20%)
    const vendor = await Vendor.findOne({ where: { id: userId } });
    const adminPercentage = vendor?.admin_chat_charge || 0; // fallback to 0% if not set

    // 2. Get transaction history from ChatTransaction
    const transactions = await ChatTransaction.findAll({
      where: { astrologer_id: userId },
      order: [['createdAt', 'DESC']],
    });

    let totalEarnings = 0;

    // 3. Transform transactions
    const formattedTransactions = transactions.map((txn) => {
      const total = txn.total_charge || 0;
      const adminCut = (total * adminPercentage) / 100;
      const netEarning = +(total - adminCut).toFixed(2); // round to 2 decimal places

      totalEarnings += netEarning;

      return {
        minuts: txn.duration_minutes || null,
        amount: total,
        earning: netEarning,
        adminearn: adminCut,
        datetime: txn.createdAt,
      };
    });

    console.log('formattedTransactions', formattedTransactions)

    return AppResponse.success({
      message: "Wallet data fetched successfully",
      data: {
        transactions: formattedTransactions,
        balance: +totalEarnings.toFixed(2), // rounded total
      },
    });

  } catch (error) {
    return AppResponse.failed({
      message: error.message || "Something went wrong",
      data: {},
    });
  }
}




}
