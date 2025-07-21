import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { OtpTypeEnum } from "@xapads/constant";

@Table({ tableName: "otps" })
export class Otp extends BaseModel {
  @Column(DataType.INTEGER)
  otp: number;

  @Column(DataType.STRING)
  mobile: string;

  @Column({
    type: DataType.ENUM({
      values: Object.keys(OtpTypeEnum),
    }),
  })
  type: string;

  @Column(DataType.STRING)
  ip: string;

  @Column(DataType.INTEGER)
  attempts: number;

  @Column(DataType.STRING)
  ua: string;

  @Column(DataType.STRING)
  device: string;

  @Column(DataType.DATE)
  ttl: Date;
}
