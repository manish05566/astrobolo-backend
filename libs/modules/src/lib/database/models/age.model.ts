import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "age_groups" })
export class AgeGroup extends BaseModel {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  age: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
