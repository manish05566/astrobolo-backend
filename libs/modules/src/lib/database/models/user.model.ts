import {
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "users" })
export class User extends BaseModel {
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
    type: DataType.STRING(10),
  })
  birth_time: string;

  @Column({
    type: DataType.STRING(7),
  })
  gender: string;

  @Column({
    type: DataType.STRING(),
  })
  mobile: string;

  @Column({
    type: DataType.STRING(100),
  })
  birth_place: string;

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
    type: DataType.STRING(7),
  })
  pincode: string;

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
  topic_of_concern: string;

  @Column({
    type: DataType.STRING(20),
  })
  occupation: string;

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
