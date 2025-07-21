import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "onboardings" })
export class Onboardings extends BaseModel {
  @Column({
    type: DataType.STRING(250),
  })
  image: string;

  @Column({
    type: DataType.STRING(50),
  })
  title: string;
  @Column({
    type: DataType.STRING(100),
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.SMALLINT(),
  })
  position: number;
}
