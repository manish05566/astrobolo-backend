import {
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { Vendor } from "./vendor.model";
import { ChatTransaction } from "./chat_transactions.model"; // ✅ Import

@Table({ tableName: "chats" })
export class Chat extends BaseModel {
  @Column({ type: DataType.UUID, allowNull: false })
  sender_id: string;

  @ForeignKey(() => Vendor)
  @Column({ type: DataType.UUID, allowNull: false })
  receiver_id: string;

  @BelongsTo(() => Vendor, { as: "astrologer", foreignKey: "receiver_id" })
  astrologer: Vendor;

  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @Column({ type: DataType.STRING, allowNull: true })
  message_type: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_read: boolean;

  @HasOne(() => ChatTransaction, { foreignKey: "chat_id" })
chat_transaction: ChatTransaction;


  
}
