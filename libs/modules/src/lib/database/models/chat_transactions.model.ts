import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { Vendor } from "./vendor.model";
import { Chat } from "./chat.model"; // ✅ Import Chat model

@Table({ tableName: "chat_transactions" })
export class ChatTransaction extends BaseModel {
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @ForeignKey(() => Vendor)
  @Column({ type: DataType.UUID, allowNull: false })
  astrologer_id: string;

  @ForeignKey(() => Chat) // ✅ Link to Chat model
  @Column({ type: DataType.UUID, allowNull: true })
  chat_id: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  total_charge: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  duration_minutes: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: "completed",
  })
  status: string;

  @BelongsTo(() => Vendor, { as: "astrologer", foreignKey: "astrologer_id" })
  astrologer: Vendor;

  @BelongsTo(() => Chat, {as: "chat", foreignKey: "chat_id" }) // ✅ Add this
  chat: Chat;
}
