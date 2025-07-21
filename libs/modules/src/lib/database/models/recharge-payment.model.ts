import {
  Column,
  DataType,
  Table,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "recharge_payments" })
export class RechargePayment extends BaseModel {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  user_id: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  astrologer_id: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  method: string; // e.g., "UPI", "Credit Card"

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  transaction_id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: "pending",
  })
  status: string; // e.g., "success", "failed", "pending"
}
