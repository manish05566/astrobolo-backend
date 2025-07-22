import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "vendors" })
export class Vendor extends BaseModel {
  @Column({
    type: DataType.STRING(50),
  })
  first_name: string;

  @Column({
    type: DataType.STRING(50),
  })
  last_name: string;

  @Column({
    type: DataType.STRING(40),
  })
  email: string;

  @Column({
    type: DataType.STRING(12),
  })
  birth_date: string;

  @Column({
    type: DataType.STRING(7),
  })
  gender: string;

  @Column({
    type: DataType.STRING(15),
  })
  mobile: string;

  @Column({
    type: DataType.STRING(30),
  })
  country: string;

  @Column({
    type: DataType.STRING(30),
  })
  state: string;

  @Column({
    type: DataType.STRING(30),
  })
  city: string;

  @Column({
    type: DataType.INTEGER(),
  })
  pincode: number;

  @Column({
    type: DataType.STRING(10),
  })
  marital_status: string;

  @Column({
    type: DataType.STRING(15),
  })
  religion: string;

  @Column({
    type: DataType.TEXT(),
  })
  language: string;

  @Column({
    type: DataType.TEXT(),
  })
  image: string;

  @Column({
    type: DataType.STRING(100),
  })
  specialist: string;

  @Column({
    type: DataType.TEXT(),
  })
  address: string;

  @Column({
    type: DataType.TEXT(),
  })
  bio: string;

  @Column({
    type: DataType.STRING(20),
  })
  experience: string;

  @Column({
    type: DataType.SMALLINT(),
  })
  call_charge: number; //charge of every minuts

  @Column({
    type: DataType.SMALLINT(),
  })
  chat_charge: number; // charge of every minuts

  @Column({
    type: DataType.SMALLINT(),
  })
  admin_call_charge: number; //charge of every minuts

  @Column({
    type: DataType.SMALLINT(),
  })
  admin_chat_charge: number; // charge of every minuts

  @Column({
    type: DataType.INTEGER(),
  })
  chat_min: number; // charge of every minuts

  @Column({
    type: DataType.INTEGER(),
  })
  call_min: number; // charge of every minuts

  @Column({
    type: DataType.TEXT(),
  })
  document1: string;

  @Column({
    type: DataType.TEXT(),
  })
  document2: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_login: boolean;
}
